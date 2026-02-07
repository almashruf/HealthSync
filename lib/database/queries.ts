import { createClient } from "@/lib/supabase/client";
import type {
  UserProfile,
  UserProfileUpdate,
  HealthCondition,
  HealthConditionInsert,
  Allergy,
  AllergyInsert,
  VitalSign,
  VitalSignInsert,
  Food,
  FoodLog,
  FoodLogInsert,
  Exercise,
  WorkoutSession,
  WorkoutSessionInsert,
  SleepRecord,
  SleepRecordInsert,
  MoodCheckin,
  MoodCheckinInsert,
  Medication,
  MedicationInsert,
  MedicationLog,
  Appointment,
  Doctor,
  SupportGroup,
  UserGoal,
  UserGoalInsert,
  Notification,
  DailyNutritionSummary,
} from "@/types/database";

// =============================================================================
// USER PROFILE QUERIES
// =============================================================================

export async function getCurrentUserProfile() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return { data: data as UserProfile | null, error: error?.message || null };
}

export async function updateUserProfile(updates: UserProfileUpdate) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("user_profiles")
    .update(updates)
    .eq("id", user.id)
    .select()
    .single();

  return { data: data as UserProfile | null, error: error?.message || null };
}

// =============================================================================
// HEALTH CONDITIONS QUERIES
// =============================================================================

export async function getHealthConditions() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("health_conditions")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  return {
    data: data as HealthCondition[] | null,
    error: error?.message || null,
  };
}

export async function addHealthCondition(
  condition: Omit<HealthConditionInsert, "user_id">,
) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("health_conditions")
    .insert({ ...condition, user_id: user.id })
    .select()
    .single();

  return {
    data: data as HealthCondition | null,
    error: error?.message || null,
  };
}

// =============================================================================
// ALLERGIES QUERIES
// =============================================================================

export async function getAllergies() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("allergies")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .order("severity", { ascending: false });

  return { data: data as Allergy[] | null, error: error?.message || null };
}

export async function addAllergy(allergy: Omit<AllergyInsert, "user_id">) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("allergies")
    .insert({ ...allergy, user_id: user.id })
    .select()
    .single();

  return { data: data as Allergy | null, error: error?.message || null };
}

// =============================================================================
// VITAL SIGNS QUERIES
// =============================================================================

export async function getRecentVitalSigns(limit = 10) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("vital_signs")
    .select("*")
    .eq("user_id", user.id)
    .order("recorded_at", { ascending: false })
    .limit(limit);

  return { data: data as VitalSign[] | null, error: error?.message || null };
}

export async function addVitalSign(
  vitalSign: Omit<VitalSignInsert, "user_id">,
) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("vital_signs")
    .insert({ ...vitalSign, user_id: user.id })
    .select()
    .single();

  return { data: data as VitalSign | null, error: error?.message || null };
}

// =============================================================================
// FOOD & NUTRITION QUERIES
// =============================================================================

export async function searchFoods(query: string, limit = 20) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("foods")
    .select("*")
    .or(
      `is_system_food.eq.true,created_by.eq.${(await supabase.auth.getUser()).data.user?.id}`,
    )
    .ilike("name", `%${query}%`)
    .limit(limit);

  return { data: data as Food[] | null, error: error?.message || null };
}

export async function getFoodsByCategory(category: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("foods")
    .select("*")
    .eq("category", category)
    .eq("is_system_food", true)
    .order("name");

  return { data: data as Food[] | null, error: error?.message || null };
}

export async function getTodayFoodLogs() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const { data, error } = await supabase
    .from("food_logs")
    .select("*, food:foods(*)")
    .eq("user_id", user.id)
    .gte("logged_at", today.toISOString())
    .lt("logged_at", tomorrow.toISOString())
    .order("logged_at", { ascending: true });

  return { data, error: error?.message || null };
}

export async function addFoodLog(foodLog: Omit<FoodLogInsert, "user_id">) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("food_logs")
    .insert({ ...foodLog, user_id: user.id })
    .select()
    .single();

  return { data: data as FoodLog | null, error: error?.message || null };
}

export async function getTodayNutritionSummary(): Promise<{
  data: DailyNutritionSummary | null;
  error: string | null;
}> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Get food logs
  const { data: foodLogs, error: foodError } = await supabase
    .from("food_logs")
    .select("calories, protein_g, carbs_g, fat_g, fiber_g")
    .eq("user_id", user.id)
    .gte("logged_at", today.toISOString())
    .lt("logged_at", tomorrow.toISOString());

  if (foodError) return { data: null, error: foodError.message };

  // Get water logs
  const { data: waterLogs, error: waterError } = await supabase
    .from("water_logs")
    .select("amount_ml")
    .eq("user_id", user.id)
    .gte("logged_at", today.toISOString())
    .lt("logged_at", tomorrow.toISOString());

  if (waterError) return { data: null, error: waterError.message };

  // Calculate totals
  const summary: DailyNutritionSummary = {
    date: today.toISOString().split("T")[0],
    total_calories:
      foodLogs?.reduce((sum, log) => sum + (log.calories || 0), 0) || 0,
    total_protein_g:
      foodLogs?.reduce((sum, log) => sum + (log.protein_g || 0), 0) || 0,
    total_carbs_g:
      foodLogs?.reduce((sum, log) => sum + (log.carbs_g || 0), 0) || 0,
    total_fat_g: foodLogs?.reduce((sum, log) => sum + (log.fat_g || 0), 0) || 0,
    total_fiber_g:
      foodLogs?.reduce((sum, log) => sum + (log.fiber_g || 0), 0) || 0,
    meal_count: foodLogs?.length || 0,
    water_ml: waterLogs?.reduce((sum, log) => sum + log.amount_ml, 0) || 0,
  };

  return { data: summary, error: null };
}

// =============================================================================
// EXERCISE & WORKOUT QUERIES
// =============================================================================

export async function getExercises(category?: string) {
  const supabase = createClient();

  let query = supabase
    .from("exercises")
    .select("*")
    .eq("is_system_exercise", true);

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query.order("name");

  return { data: data as Exercise[] | null, error: error?.message || null };
}

export async function searchExercises(query: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .eq("is_system_exercise", true)
    .ilike("name", `%${query}%`)
    .limit(20);

  return { data: data as Exercise[] | null, error: error?.message || null };
}

export async function getRecentWorkouts(limit = 10) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("workout_sessions")
    .select("*, workout_plan:workout_plans(*)")
    .eq("user_id", user.id)
    .order("started_at", { ascending: false })
    .limit(limit);

  return {
    data: data as WorkoutSession[] | null,
    error: error?.message || null,
  };
}

export async function startWorkoutSession(
  session: Omit<WorkoutSessionInsert, "user_id">,
) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("workout_sessions")
    .insert({
      ...session,
      user_id: user.id,
      status: "in_progress",
      started_at: new Date().toISOString(),
    })
    .select()
    .single();

  return { data: data as WorkoutSession | null, error: error?.message || null };
}

// =============================================================================
// SLEEP QUERIES
// =============================================================================

export async function getRecentSleepRecords(limit = 7) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("sleep_records")
    .select("*")
    .eq("user_id", user.id)
    .order("sleep_start", { ascending: false })
    .limit(limit);

  return { data: data as SleepRecord[] | null, error: error?.message || null };
}

export async function addSleepRecord(
  record: Omit<SleepRecordInsert, "user_id">,
) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  // Calculate duration
  const start = new Date(record.sleep_start);
  const end = new Date(record.sleep_end);
  const duration_minutes = Math.round(
    (end.getTime() - start.getTime()) / (1000 * 60),
  );

  const { data, error } = await supabase
    .from("sleep_records")
    .insert({
      ...record,
      user_id: user.id,
      duration_minutes,
    })
    .select()
    .single();

  return { data: data as SleepRecord | null, error: error?.message || null };
}

// =============================================================================
// MOOD QUERIES
// =============================================================================

export async function getRecentMoodCheckins(limit = 14) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("mood_checkins")
    .select("*")
    .eq("user_id", user.id)
    .order("checked_in_at", { ascending: false })
    .limit(limit);

  return { data: data as MoodCheckin[] | null, error: error?.message || null };
}

export async function addMoodCheckin(
  checkin: Omit<MoodCheckinInsert, "user_id">,
) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("mood_checkins")
    .insert({ ...checkin, user_id: user.id })
    .select()
    .single();

  return { data: data as MoodCheckin | null, error: error?.message || null };
}

// =============================================================================
// MEDICATION QUERIES
// =============================================================================

export async function getActiveMedications() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("medications")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .order("name");

  return { data: data as Medication[] | null, error: error?.message || null };
}

export async function addMedication(
  medication: Omit<MedicationInsert, "user_id">,
) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("medications")
    .insert({ ...medication, user_id: user.id })
    .select()
    .single();

  return { data: data as Medication | null, error: error?.message || null };
}

export async function getTodayMedicationLogs() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const { data, error } = await supabase
    .from("medication_logs")
    .select("*, medication:medications(*)")
    .eq("user_id", user.id)
    .gte("scheduled_time", today.toISOString())
    .lt("scheduled_time", tomorrow.toISOString())
    .order("scheduled_time");

  return {
    data: data as MedicationLog[] | null,
    error: error?.message || null,
  };
}

// =============================================================================
// APPOINTMENT & DOCTOR QUERIES
// =============================================================================

export async function getDoctors(specialty?: string) {
  const supabase = createClient();

  let query = supabase
    .from("doctors")
    .select("*")
    .eq("is_active", true)
    .eq("is_verified", true);

  if (specialty) {
    query = query.eq("specialty", specialty);
  }

  const { data, error } = await query.order("average_rating", {
    ascending: false,
  });

  return { data: data as Doctor[] | null, error: error?.message || null };
}

export async function getUpcomingAppointments() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("appointments")
    .select("*, doctor:doctors(*)")
    .eq("user_id", user.id)
    .in("status", ["scheduled", "confirmed"])
    .gte("scheduled_at", new Date().toISOString())
    .order("scheduled_at");

  return { data: data as Appointment[] | null, error: error?.message || null };
}

// =============================================================================
// SUPPORT GROUPS QUERIES
// =============================================================================

export async function getPublicGroups(category?: string) {
  const supabase = createClient();

  let query = supabase
    .from("support_groups")
    .select("*")
    .eq("is_public", true)
    .eq("is_active", true);

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query.order("member_count", {
    ascending: false,
  });

  return { data: data as SupportGroup[] | null, error: error?.message || null };
}

export async function getMyGroups() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("group_members")
    .select("*, support_group:support_groups(*)")
    .eq("user_id", user.id)
    .eq("status", "active");

  return { data, error: error?.message || null };
}

// =============================================================================
// GOALS QUERIES
// =============================================================================

export async function getActiveGoals() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("user_goals")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "active")
    .order("target_date", { ascending: true });

  return { data: data as UserGoal[] | null, error: error?.message || null };
}

export async function addGoal(goal: Omit<UserGoalInsert, "user_id">) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("user_goals")
    .insert({ ...goal, user_id: user.id })
    .select()
    .single();

  return { data: data as UserGoal | null, error: error?.message || null };
}

// =============================================================================
// NOTIFICATIONS QUERIES
// =============================================================================

export async function getUnreadNotifications() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Not authenticated" };

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_read", false)
    .order("created_at", { ascending: false })
    .limit(50);

  return { data: data as Notification[] | null, error: error?.message || null };
}

export async function markNotificationAsRead(notificationId: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true, read_at: new Date().toISOString() })
    .eq("id", notificationId);

  return { error: error?.message || null };
}

export async function markAllNotificationsAsRead() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true, read_at: new Date().toISOString() })
    .eq("user_id", user.id)
    .eq("is_read", false);

  return { error: error?.message || null };
}
