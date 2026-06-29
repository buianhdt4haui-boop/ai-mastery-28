import type { PlanId, QuizAnswers } from "@/types";
import { getPersona, personas } from "@/data/personas";

export interface QuizResult {
  personaId: string;
  recommendedPlan: PlanId;
  /** Các mảng trọng tâm suy ra từ câu trả lời, để hiển thị ở trang kết quả. */
  focusAreas: string[];
  /** Câu mô tả ngắn nhịp học phù hợp. */
  pace: string;
}

function asArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

/**
 * Chấm quiz một cách tất định:
 * - Persona: lấy theo vai trò (role); fallback theo mục tiêu.
 * - Gói: bắt đầu từ gói gợi ý của persona, điều chỉnh theo mục tiêu/đầu ra/trình độ.
 */
export function scoreQuiz(answers: QuizAnswers): QuizResult {
  const role = (answers.role as string) ?? "";
  const goal = (answers.goal as string) ?? "";
  const level = (answers.level as string) ?? "beginner";
  const output = (answers.output as string) ?? "";
  const time = (answers.time_per_day as string) ?? "15";
  const consistency = (answers.consistency as string) ?? "daily";
  const interests = asArray(answers.interest);

  // 1) Persona
  let persona = getPersona(role);
  if (!persona) {
    const goalToPersona: Record<string, string> = {
      video: "creator",
      sales: "seller",
      ads: "marketer",
      income: "freelancer",
      productivity: "office",
      automation: "office",
    };
    persona = getPersona(goalToPersona[goal] ?? "student") ?? personas[personas.length - 1];
  }

  // 2) Gói gợi ý — điều chỉnh điểm
  const planScore: Record<PlanId, number> = { starter: 0, pro: 0, premium: 0 };
  planScore[persona.recommendedPlan] += 2;

  if (output === "product" || output === "service") planScore.premium += 2;
  if (output === "content") planScore.pro += 1;
  if (output === "skill") planScore.starter += 1;

  if (goal === "income" || goal === "ads") planScore.premium += 1;
  if (goal === "sales" || goal === "video") planScore.pro += 1;
  if (goal === "productivity") planScore.starter += 1;

  if (level === "beginner") planScore.starter += 1;
  if (level === "intermediate") planScore.premium += 1;

  const recommendedPlan = (Object.entries(planScore) as [PlanId, number][]).sort(
    (a, b) => b[1] - a[1],
  )[0][0];

  // 3) Mảng trọng tâm
  const interestLabels: Record<string, string> = {
    writing: "Viết & nội dung",
    image: "Hình ảnh & thiết kế",
    video: "Video & âm thanh",
    automation: "Tự động hóa & dữ liệu",
  };
  const focusAreas =
    interests.length > 0
      ? interests.map((i) => interestLabels[i] ?? i)
      : ["Nền tảng AI & prompting"];

  // 4) Nhịp học
  const timeLabel =
    time === "60" ? "1 tiếng mỗi ngày" : time === "30" ? "30 phút mỗi ngày" : "15 phút mỗi ngày";
  const consistencyLabel =
    consistency === "weekend"
      ? "tập trung cuối tuần"
      : consistency === "few_times_week"
        ? "vài buổi mỗi tuần"
        : "đều đặn mỗi ngày";
  const pace = `Phù hợp với nhịp ${timeLabel}, ${consistencyLabel}.`;

  return {
    personaId: persona.id,
    recommendedPlan,
    focusAreas,
    pace,
  };
}
