import { NextResponse } from "next/server";
import { curriculum, weekThemes } from "@/data/curriculum";
import { getLessonContent } from "@/data/lesson-content";

/**
 * Xuất toàn bộ nội dung 28 ngày để import sang LMS/hệ thống khác.
 *   GET /api/export            -> JSON
 *   GET /api/export?format=md  -> Markdown
 *
 * Gộp tên bài & mục tiêu (curriculum) với nội dung chi tiết (lesson-content),
 * dùng chính nguồn dữ liệu của app nên luôn đồng bộ.
 */
function buildData() {
  return curriculum.map((d) => {
    const c = getLessonContent(d.day);
    return {
      day: d.day,
      week: d.week,
      weekTheme: weekThemes[d.week],
      title: d.title,
      tool: d.tool,
      estimatedMinutes: d.estimatedMinutes,
      objective: d.objective,
      theory: c?.theory ?? d.lessonSummary,
      steps: c?.steps ?? [],
      prompts: c?.prompts ?? [],
      exercise: c?.exercise ?? d.assignment,
      checklist: c?.checklist ?? [],
      commonMistake: c?.commonMistake ?? "",
      vietnamExample: c?.vietnamExample ?? "",
      resourceName: d.resourceName,
    };
  });
}

function toMarkdown(data: ReturnType<typeof buildData>): string {
  const lines: string[] = [
    "# AI Mastery 28 Ngày — Nội dung khóa học",
    "",
    "> Mỗi ngày 15–20 phút. Tài liệu học tập, không cam kết về thu nhập.",
    "",
  ];
  for (const d of data) {
    lines.push(`## Ngày ${d.day}: ${d.title}`);
    lines.push("");
    lines.push(`- **Tuần ${d.week}:** ${d.weekTheme}`);
    lines.push(`- **Công cụ:** ${d.tool} · **Thời lượng:** ~${d.estimatedMinutes} phút`);
    lines.push("");
    lines.push(`**Mục tiêu:** ${d.objective}`);
    lines.push("");
    lines.push(`**Lý thuyết:** ${d.theory}`);
    lines.push("");
    if (d.steps.length) {
      lines.push("**Hướng dẫn thực hành:**");
      d.steps.forEach((s, i) => lines.push(`${i + 1}. ${s}`));
      lines.push("");
    }
    if (d.prompts.length) {
      lines.push("**3 prompt mẫu:**");
      d.prompts.forEach((p) => lines.push(`- \`${p}\``));
      lines.push("");
    }
    lines.push(`**Bài tập ứng dụng:** ${d.exercise}`);
    lines.push("");
    if (d.checklist.length) {
      lines.push("**Checklist hoàn thành:**");
      d.checklist.forEach((c) => lines.push(`- [ ] ${c}`));
      lines.push("");
    }
    lines.push(`**Lỗi thường gặp:** ${d.commonMistake}`);
    lines.push("");
    lines.push(`**Ví dụ tại Việt Nam:** ${d.vietnamExample}`);
    lines.push("");
    lines.push("---");
    lines.push("");
  }
  return lines.join("\n");
}

export async function GET(request: Request) {
  const format = new URL(request.url).searchParams.get("format");
  const data = buildData();

  if (format === "md") {
    return new NextResponse(toMarkdown(data), {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Content-Disposition": 'attachment; filename="ai-mastery-28-content.md"',
      },
    });
  }

  return NextResponse.json(
    { course: "AI Mastery 28 Ngày", totalDays: data.length, days: data },
    {
      headers: {
        "Content-Disposition": 'attachment; filename="ai-mastery-28-content.json"',
      },
    },
  );
}
