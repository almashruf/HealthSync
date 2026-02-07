// =============================================================================
// HEALTHSYNC DATABASE TYPES
// =============================================================================
// These types match the Supabase database schema
// Generated for Day 2 of HealthSync development

// =============================================================================
// ENUMS & CONSTANTS
// =============================================================================

export type Gender = "male" | "female" | "other" | "prefer_not_to_say";
export type BloodType =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-"
  | "unknown";
export type UnitsSystem = "metric" | "imperial";

export type Severity = "mild" | "moderate" | "severe";
export type AllergySeverity =
  | "mild"
  | "moderate"
  | "severe"
  | "life_threatening";
export type AllergyType = "food" | "medication" | "environmental" | "other";

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";
export type GoalType =
  | "lose_weight"
  | "maintain"
  | "gain_weight"
  | "build_muscle"
  | "custom";

export type Difficulty = "beginner" | "intermediate" | "advanced";
export type ExerciseType =
  | "strength"
  | "cardio"
  | "hiit"
  | "flexibility"
  | "balance"
  | "other";
export type WorkoutGoal =
  | "build_muscle"
  | "lose_weight"
  | "improve_endurance"
  | "flexibility"
  | "general_fitness";
export type WorkoutStatus = "in_progress" | "completed" | "abandoned";

export type MoodLabel = "terrible" | "bad" | "okay" | "good" | "great";
export type MoodScore = 1 | 2 | 3 | 4 | 5;

export type MedicationStatus = "pending" | "taken" | "skipped" | "missed";

export type AppointmentType = "in_person" | "video" | "phone";
export type AppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "no_show";
export type PaymentStatus = "pending" | "paid" | "refunded" | "free";

export type ConfidenceLevel = "low" | "medium" | "high";
export type UrgencyLevel = "none" | "low" | "medium" | "high" | "emergency";
export type SymptomSessionStatus = "in_progress" | "completed" | "abandoned";

export type GroupRole = "member" | "moderator" | "admin";
export type GroupMemberStatus = "pending" | "active" | "banned" | "left";
export type PostType =
  | "discussion"
  | "question"
  | "success_story"
  | "support_request"
  | "resource";

export type UserGoalType =
  | "weight"
  | "steps"
  | "water"
  | "sleep"
  | "exercise"
  | "nutrition"
  | "medication"
  | "custom";
export type UserGoalStatus = "active" | "completed" | "paused" | "abandoned";
export type GoalFrequency = "daily" | "weekly" | "monthly" | "one_time";

export type NotificationType =
  | "medication_reminder"
  | "appointment_reminder"
  | "goal_achieved"
  | "goal_reminder"
  | "community_activity"
  | "system_alert"
  | "health_insight"
  | "general";

// =============================================================================
// DATABASE ROW TYPES
// =============================================================================

export interface UserProfile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  display_name: string | null;
  avatar_url: string | null;
  date_of_birth: string | null; // ISO date string
  gender: Gender | null;
  phone: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  blood_type: BloodType | null;
  timezone: string;
  units_system: UnitsSystem;
  language: string;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  emergency_contact_relation: string | null;
  onboarding_completed: boolean;
  email_notifications: boolean;
  push_notifications: boolean;
  created_at: string;
  updated_at: string;
}

export interface HealthCondition {
  id: string;
  user_id: string;
  condition_name: string;
  condition_type: string | null;
  severity: Severity | null;
  diagnosed_date: string | null;
  diagnosed_by: string | null;
  is_active: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Allergy {
  id: string;
  user_id: string;
  allergen: string;
  allergy_type: AllergyType;
  severity: AllergySeverity;
  reaction_description: string | null;
  is_active: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface VitalSign {
  id: string;
  user_id: string;
  recorded_at: string;
  blood_pressure_systolic: number | null;
  blood_pressure_diastolic: number | null;
  heart_rate: number | null;
  temperature_celsius: number | null;
  respiratory_rate: number | null;
  oxygen_saturation: number | null;
  blood_glucose: number | null;
  weight_kg: number | null;
  measurement_context: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface SymptomSession {
  id: string;
  user_id: string;
  started_at: string;
  completed_at: string | null;
  ai_analysis: string | null;
  primary_assessment: string | null;
  confidence_level: ConfidenceLevel | null;
  urgency_level: UrgencyLevel | null;
  recommended_actions: string[] | null;
  should_see_doctor: boolean;
  user_feedback_rating: number | null;
  user_feedback_text: string | null;
  status: SymptomSessionStatus;
  created_at: string;
  updated_at: string;
}

export interface SymptomReport {
  id: string;
  session_id: string;
  user_id: string;
  symptom_name: string;
  body_location: string | null;
  severity: number | null;
  symptom_type: string | null;
  frequency: string | null;
  started_when: string | null;
  duration: string | null;
  triggers: string | null;
  relievers: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Food {
  id: string;
  created_by: string | null;
  is_system_food: boolean;
  is_verified: boolean;
  name: string;
  brand: string | null;
  category: string | null;
  serving_size: number;
  serving_unit: string;
  calories: number | null;
  protein_g: number | null;
  carbs_g: number | null;
  fat_g: number | null;
  fiber_g: number | null;
  sugar_g: number | null;
  sodium_mg: number | null;
  potassium_mg: number | null;
  cholesterol_mg: number | null;
  vitamin_a_mcg: number | null;
  vitamin_c_mg: number | null;
  vitamin_d_mcg: number | null;
  calcium_mg: number | null;
  iron_mg: number | null;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_gluten_free: boolean;
  is_dairy_free: boolean;
  is_nut_free: boolean;
  barcode: string | null;
  image_url: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface FoodLog {
  id: string;
  user_id: string;
  food_id: string | null;
  logged_at: string;
  meal_type: MealType;
  servings: number;
  calories: number | null;
  protein_g: number | null;
  carbs_g: number | null;
  fat_g: number | null;
  fiber_g: number | null;
  custom_food_name: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface NutritionGoal {
  id: string;
  user_id: string;
  calories_target: number | null;
  protein_g_target: number | null;
  carbs_g_target: number | null;
  fat_g_target: number | null;
  fiber_g_target: number | null;
  water_ml_target: number | null;
  goal_type: GoalType | null;
  is_active: boolean;
  start_date: string;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface WaterLog {
  id: string;
  user_id: string;
  amount_ml: number;
  logged_at: string;
  created_at: string;
}

export interface Exercise {
  id: string;
  created_by: string | null;
  is_system_exercise: boolean;
  name: string;
  description: string | null;
  instructions: string | null;
  category: string;
  muscle_group: string | null;
  secondary_muscles: string[] | null;
  equipment: string[] | null;
  difficulty: Difficulty | null;
  exercise_type: ExerciseType | null;
  tracks_reps: boolean;
  tracks_weight: boolean;
  tracks_duration: boolean;
  tracks_distance: boolean;
  calories_per_minute: number | null;
  met_value: number | null;
  image_url: string | null;
  video_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface WorkoutPlan {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  days_per_week: number | null;
  estimated_duration_minutes: number | null;
  goal: WorkoutGoal | null;
  difficulty: Difficulty | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface WorkoutPlanExercise {
  id: string;
  plan_id: string;
  exercise_id: string;
  day_of_week: number | null;
  exercise_order: number;
  target_sets: number | null;
  target_reps: number | null;
  target_weight_kg: number | null;
  target_duration_seconds: number | null;
  target_distance_meters: number | null;
  rest_seconds: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface WorkoutSession {
  id: string;
  user_id: string;
  plan_id: string | null;
  started_at: string;
  ended_at: string | null;
  duration_minutes: number | null;
  name: string | null;
  total_calories_burned: number | null;
  total_exercises: number | null;
  total_sets: number | null;
  difficulty_rating: number | null;
  mood_before: MoodLabel | null;
  mood_after: MoodLabel | null;
  notes: string | null;
  status: WorkoutStatus;
  created_at: string;
  updated_at: string;
}

export interface ExerciseSetData {
  reps?: number;
  weight_kg?: number;
  duration_seconds?: number;
}

export interface ExerciseLog {
  id: string;
  session_id: string;
  exercise_id: string | null;
  user_id: string;
  exercise_order: number;
  exercise_name: string;
  sets_data: ExerciseSetData[] | null;
  total_sets: number | null;
  total_reps: number | null;
  max_weight_kg: number | null;
  total_duration_seconds: number | null;
  total_distance_meters: number | null;
  calories_burned: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface SleepFactors {
  caffeine?: boolean;
  exercise?: boolean;
  stress?: boolean;
  alcohol?: boolean;
  screen_time?: boolean;
  late_meal?: boolean;
}

export interface SleepRecord {
  id: string;
  user_id: string;
  sleep_start: string;
  sleep_end: string;
  duration_minutes: number | null;
  quality_rating: number | null;
  time_to_fall_asleep_minutes: number | null;
  times_woken: number | null;
  deep_sleep_minutes: number | null;
  light_sleep_minutes: number | null;
  rem_sleep_minutes: number | null;
  awake_minutes: number | null;
  notes: string | null;
  factors: SleepFactors | null;
  created_at: string;
  updated_at: string;
}

export interface MoodCheckin {
  id: string;
  user_id: string;
  checked_in_at: string;
  mood_score: MoodScore;
  mood_label: MoodLabel | null;
  energy_level: number | null;
  stress_level: number | null;
  anxiety_level: number | null;
  emotions: string[] | null;
  activities: string[] | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface JournalEntry {
  id: string;
  user_id: string;
  title: string | null;
  content: string;
  mood_score: number | null;
  tags: string[] | null;
  ai_insights: string | null;
  is_private: boolean;
  entry_date: string;
  created_at: string;
  updated_at: string;
}

export interface Medication {
  id: string;
  user_id: string;
  name: string;
  generic_name: string | null;
  dosage: string;
  dosage_form: string | null;
  instructions: string | null;
  prescribing_doctor: string | null;
  pharmacy: string | null;
  frequency: string | null;
  times_per_day: number | null;
  specific_times: string[] | null;
  start_date: string | null;
  end_date: string | null;
  purpose: string | null;
  condition_id: string | null;
  current_supply: number | null;
  refills_remaining: number | null;
  next_refill_date: string | null;
  reminder_enabled: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MedicationLog {
  id: string;
  medication_id: string;
  user_id: string;
  scheduled_time: string;
  taken_at: string | null;
  status: MedicationStatus;
  skip_reason: string | null;
  notes: string | null;
  side_effects: string | null;
  created_at: string;
  updated_at: string;
}

export interface Doctor {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  specialty: string;
  license_number: string | null;
  years_of_experience: number | null;
  practice_name: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string;
  available_days: string[] | null;
  consultation_fee: number | null;
  average_rating: number | null;
  total_reviews: number;
  bio: string | null;
  avatar_url: string | null;
  offers_telemedicine: boolean;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  user_id: string;
  doctor_id: string;
  appointment_type: AppointmentType;
  scheduled_at: string;
  duration_minutes: number;
  reason: string | null;
  symptoms: string | null;
  symptom_session_id: string | null;
  status: AppointmentStatus;
  meeting_url: string | null;
  meeting_id: string | null;
  patient_notes: string | null;
  doctor_notes: string | null;
  prescription: string | null;
  follow_up_notes: string | null;
  reminder_sent: boolean;
  payment_status: PaymentStatus;
  payment_amount: number | null;
  created_at: string;
  updated_at: string;
}

export interface DoctorReview {
  id: string;
  doctor_id: string;
  user_id: string;
  appointment_id: string | null;
  rating: number;
  title: string | null;
  review: string | null;
  communication_rating: number | null;
  professionalism_rating: number | null;
  wait_time_rating: number | null;
  would_recommend: boolean | null;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface SupportGroup {
  id: string;
  name: string;
  description: string | null;
  category: string;
  is_public: boolean;
  requires_approval: boolean;
  rules: string | null;
  cover_image_url: string | null;
  icon_url: string | null;
  member_count: number;
  post_count: number;
  created_by: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GroupMember {
  id: string;
  group_id: string;
  user_id: string;
  role: GroupRole;
  status: GroupMemberStatus;
  notifications_enabled: boolean;
  joined_at: string;
  created_at: string;
  updated_at: string;
}

export interface GroupPost {
  id: string;
  group_id: string;
  author_id: string;
  title: string | null;
  content: string;
  post_type: PostType;
  image_urls: string[] | null;
  like_count: number;
  comment_count: number;
  is_pinned: boolean;
  is_approved: boolean;
  is_anonymous: boolean;
  created_at: string;
  updated_at: string;
}

export interface PostComment {
  id: string;
  post_id: string;
  author_id: string;
  parent_comment_id: string | null;
  content: string;
  like_count: number;
  is_approved: boolean;
  is_anonymous: boolean;
  created_at: string;
  updated_at: string;
}

export interface PostLike {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

export interface UserGoal {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  goal_type: UserGoalType;
  target_value: number | null;
  target_unit: string | null;
  current_value: number;
  progress_percentage: number;
  start_date: string;
  target_date: string | null;
  frequency: GoalFrequency | null;
  status: UserGoalStatus;
  completed_at: string | null;
  reminder_enabled: boolean;
  reminder_time: string | null;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  notification_type: NotificationType;
  related_type: string | null;
  related_id: string | null;
  action_url: string | null;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  activity_type: string;
  activity_data: Record<string, unknown> | null;
  created_at: string;
}

// =============================================================================
// INSERT TYPES (for creating new records)
// =============================================================================

export type UserProfileInsert = Omit<UserProfile, "created_at" | "updated_at">;
export type UserProfileUpdate = Partial<
  Omit<UserProfile, "id" | "created_at" | "updated_at">
>;

export type HealthConditionInsert = Omit<
  HealthCondition,
  "id" | "created_at" | "updated_at"
>;
export type HealthConditionUpdate = Partial<
  Omit<HealthCondition, "id" | "user_id" | "created_at" | "updated_at">
>;

export type AllergyInsert = Omit<Allergy, "id" | "created_at" | "updated_at">;
export type AllergyUpdate = Partial<
  Omit<Allergy, "id" | "user_id" | "created_at" | "updated_at">
>;

export type VitalSignInsert = Omit<
  VitalSign,
  "id" | "created_at" | "updated_at"
>;
export type VitalSignUpdate = Partial<
  Omit<VitalSign, "id" | "user_id" | "created_at" | "updated_at">
>;

export type SymptomSessionInsert = Omit<
  SymptomSession,
  "id" | "created_at" | "updated_at"
>;
export type SymptomSessionUpdate = Partial<
  Omit<SymptomSession, "id" | "user_id" | "created_at" | "updated_at">
>;

export type SymptomReportInsert = Omit<
  SymptomReport,
  "id" | "created_at" | "updated_at"
>;
export type SymptomReportUpdate = Partial<
  Omit<
    SymptomReport,
    "id" | "user_id" | "session_id" | "created_at" | "updated_at"
  >
>;

export type FoodInsert = Omit<Food, "id" | "created_at" | "updated_at">;
export type FoodUpdate = Partial<
  Omit<Food, "id" | "created_at" | "updated_at">
>;

export type FoodLogInsert = Omit<FoodLog, "id" | "created_at" | "updated_at">;
export type FoodLogUpdate = Partial<
  Omit<FoodLog, "id" | "user_id" | "created_at" | "updated_at">
>;

export type NutritionGoalInsert = Omit<
  NutritionGoal,
  "id" | "created_at" | "updated_at"
>;
export type NutritionGoalUpdate = Partial<
  Omit<NutritionGoal, "id" | "user_id" | "created_at" | "updated_at">
>;

export type WaterLogInsert = Omit<WaterLog, "id" | "created_at">;

export type ExerciseInsert = Omit<Exercise, "id" | "created_at" | "updated_at">;
export type ExerciseUpdate = Partial<
  Omit<Exercise, "id" | "created_at" | "updated_at">
>;

export type WorkoutPlanInsert = Omit<
  WorkoutPlan,
  "id" | "created_at" | "updated_at"
>;
export type WorkoutPlanUpdate = Partial<
  Omit<WorkoutPlan, "id" | "user_id" | "created_at" | "updated_at">
>;

export type WorkoutPlanExerciseInsert = Omit<
  WorkoutPlanExercise,
  "id" | "created_at" | "updated_at"
>;
export type WorkoutPlanExerciseUpdate = Partial<
  Omit<WorkoutPlanExercise, "id" | "plan_id" | "created_at" | "updated_at">
>;

export type WorkoutSessionInsert = Omit<
  WorkoutSession,
  "id" | "created_at" | "updated_at"
>;
export type WorkoutSessionUpdate = Partial<
  Omit<WorkoutSession, "id" | "user_id" | "created_at" | "updated_at">
>;

export type ExerciseLogInsert = Omit<
  ExerciseLog,
  "id" | "created_at" | "updated_at"
>;
export type ExerciseLogUpdate = Partial<
  Omit<
    ExerciseLog,
    "id" | "user_id" | "session_id" | "created_at" | "updated_at"
  >
>;

export type SleepRecordInsert = Omit<
  SleepRecord,
  "id" | "created_at" | "updated_at"
>;
export type SleepRecordUpdate = Partial<
  Omit<SleepRecord, "id" | "user_id" | "created_at" | "updated_at">
>;

export type MoodCheckinInsert = Omit<
  MoodCheckin,
  "id" | "created_at" | "updated_at"
>;
export type MoodCheckinUpdate = Partial<
  Omit<MoodCheckin, "id" | "user_id" | "created_at" | "updated_at">
>;

export type JournalEntryInsert = Omit<
  JournalEntry,
  "id" | "created_at" | "updated_at"
>;
export type JournalEntryUpdate = Partial<
  Omit<JournalEntry, "id" | "user_id" | "created_at" | "updated_at">
>;

export type MedicationInsert = Omit<
  Medication,
  "id" | "created_at" | "updated_at"
>;
export type MedicationUpdate = Partial<
  Omit<Medication, "id" | "user_id" | "created_at" | "updated_at">
>;

export type MedicationLogInsert = Omit<
  MedicationLog,
  "id" | "created_at" | "updated_at"
>;
export type MedicationLogUpdate = Partial<
  Omit<
    MedicationLog,
    "id" | "user_id" | "medication_id" | "created_at" | "updated_at"
  >
>;

export type AppointmentInsert = Omit<
  Appointment,
  "id" | "created_at" | "updated_at"
>;
export type AppointmentUpdate = Partial<
  Omit<Appointment, "id" | "user_id" | "created_at" | "updated_at">
>;

export type DoctorReviewInsert = Omit<
  DoctorReview,
  "id" | "created_at" | "updated_at"
>;
export type DoctorReviewUpdate = Partial<
  Omit<
    DoctorReview,
    "id" | "user_id" | "doctor_id" | "created_at" | "updated_at"
  >
>;

export type SupportGroupInsert = Omit<
  SupportGroup,
  "id" | "member_count" | "post_count" | "created_at" | "updated_at"
>;
export type SupportGroupUpdate = Partial<
  Omit<SupportGroup, "id" | "created_by" | "created_at" | "updated_at">
>;

export type GroupMemberInsert = Omit<
  GroupMember,
  "id" | "joined_at" | "created_at" | "updated_at"
>;
export type GroupMemberUpdate = Partial<
  Omit<GroupMember, "id" | "group_id" | "user_id" | "created_at" | "updated_at">
>;

export type GroupPostInsert = Omit<
  GroupPost,
  "id" | "like_count" | "comment_count" | "created_at" | "updated_at"
>;
export type GroupPostUpdate = Partial<
  Omit<GroupPost, "id" | "group_id" | "author_id" | "created_at" | "updated_at">
>;

export type PostCommentInsert = Omit<
  PostComment,
  "id" | "like_count" | "created_at" | "updated_at"
>;
export type PostCommentUpdate = Partial<
  Omit<
    PostComment,
    "id" | "post_id" | "author_id" | "created_at" | "updated_at"
  >
>;

export type PostLikeInsert = Omit<PostLike, "id" | "created_at">;

export type UserGoalInsert = Omit<
  UserGoal,
  | "id"
  | "current_value"
  | "progress_percentage"
  | "completed_at"
  | "created_at"
  | "updated_at"
>;
export type UserGoalUpdate = Partial<
  Omit<UserGoal, "id" | "user_id" | "created_at" | "updated_at">
>;

export type NotificationInsert = Omit<
  Notification,
  "id" | "is_read" | "read_at" | "created_at"
>;

export type ActivityLogInsert = Omit<ActivityLog, "id" | "created_at">;

// =============================================================================
// JOINED/EXTENDED TYPES (for queries with relations)
// =============================================================================

export interface FoodLogWithFood extends FoodLog {
  food: Food | null;
}

export interface WorkoutSessionWithPlan extends WorkoutSession {
  workout_plan: WorkoutPlan | null;
}

export interface ExerciseLogWithExercise extends ExerciseLog {
  exercise: Exercise | null;
}

export interface MedicationLogWithMedication extends MedicationLog {
  medication: Medication;
}

export interface AppointmentWithDoctor extends Appointment {
  doctor: Doctor;
}

export interface GroupPostWithAuthor extends GroupPost {
  author: Pick<
    UserProfile,
    "id" | "first_name" | "last_name" | "avatar_url"
  > | null;
}

export interface PostCommentWithAuthor extends PostComment {
  author: Pick<
    UserProfile,
    "id" | "first_name" | "last_name" | "avatar_url"
  > | null;
}

export interface GroupMemberWithProfile extends GroupMember {
  user_profile: Pick<
    UserProfile,
    "id" | "first_name" | "last_name" | "avatar_url"
  >;
}

// =============================================================================
// DASHBOARD/ANALYTICS TYPES
// =============================================================================

export interface DailyNutritionSummary {
  date: string;
  total_calories: number;
  total_protein_g: number;
  total_carbs_g: number;
  total_fat_g: number;
  total_fiber_g: number;
  meal_count: number;
  water_ml: number;
}

export interface WeeklyWorkoutSummary {
  week_start: string;
  total_workouts: number;
  total_duration_minutes: number;
  total_calories_burned: number;
  average_difficulty: number;
}

export interface SleepAnalytics {
  average_duration_minutes: number;
  average_quality: number;
  total_records: number;
  best_night: SleepRecord | null;
  worst_night: SleepRecord | null;
}

export interface MoodTrend {
  date: string;
  average_mood: number;
  average_energy: number;
  average_stress: number;
  checkin_count: number;
}

export interface HealthDashboard {
  user_profile: UserProfile;
  recent_vitals: VitalSign | null;
  today_nutrition: DailyNutritionSummary | null;
  today_water_ml: number;
  weekly_workouts: number;
  last_sleep: SleepRecord | null;
  current_mood: MoodCheckin | null;
  pending_medications: MedicationLog[];
  upcoming_appointments: Appointment[];
  active_goals: UserGoal[];
  unread_notifications: number;
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// =============================================================================
// FORM TYPES (for React Hook Form)
// =============================================================================

export interface ProfileFormData {
  first_name: string;
  last_name: string;
  display_name?: string;
  date_of_birth?: string;
  gender?: Gender;
  phone?: string;
  height_cm?: number;
  weight_kg?: number;
  blood_type?: BloodType;
  timezone?: string;
  units_system?: UnitsSystem;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  emergency_contact_relation?: string;
}

export interface VitalSignFormData {
  blood_pressure_systolic?: number;
  blood_pressure_diastolic?: number;
  heart_rate?: number;
  temperature_celsius?: number;
  respiratory_rate?: number;
  oxygen_saturation?: number;
  blood_glucose?: number;
  weight_kg?: number;
  measurement_context?: string;
  notes?: string;
}

export interface FoodLogFormData {
  food_id?: string;
  custom_food_name?: string;
  meal_type: MealType;
  servings: number;
  logged_at?: string;
  notes?: string;
}

export interface WorkoutSessionFormData {
  name?: string;
  plan_id?: string;
  notes?: string;
  mood_before?: MoodLabel;
}

export interface SleepRecordFormData {
  sleep_start: string;
  sleep_end: string;
  quality_rating?: number;
  time_to_fall_asleep_minutes?: number;
  times_woken?: number;
  notes?: string;
  factors?: SleepFactors;
}

export interface MoodCheckinFormData {
  mood_score: MoodScore;
  mood_label?: MoodLabel;
  energy_level?: number;
  stress_level?: number;
  anxiety_level?: number;
  emotions?: string[];
  activities?: string[];
  notes?: string;
}

export interface MedicationFormData {
  name: string;
  generic_name?: string;
  dosage: string;
  dosage_form?: string;
  instructions?: string;
  frequency?: string;
  times_per_day?: number;
  specific_times?: string[];
  start_date?: string;
  end_date?: string;
  purpose?: string;
  current_supply?: number;
  reminder_enabled?: boolean;
}

export interface GoalFormData {
  title: string;
  description?: string;
  goal_type: UserGoalType;
  target_value?: number;
  target_unit?: string;
  target_date?: string;
  frequency?: GoalFrequency;
  reminder_enabled?: boolean;
  reminder_time?: string;
}
