import { getServerSession } from "next-auth";
import { askCareerCoach } from "@/lib/claude";

jest.mock("next-auth", () => ({
  getServerSession: jest.fn()
}));

jest.mock("@/lib/claude", () => ({
  askCareerCoach: jest.fn()
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: (payload: any, init?: any) => ({
      status: init?.status ?? 200,
      json: async () => payload
    })
  }
}));

jest.mock("@/lib/auth", () => ({
  authOptions: {}
}));

describe("AI Coach API", () => {
  let POST: any;

  beforeAll(() => {
    const route = require("./route");
    POST = route.POST;
  });

  it("returns unauthorized when session is missing", async () => {
    (getServerSession as jest.Mock).mockResolvedValue(null);

    const req = { json: jest.fn().mockResolvedValue({ message: "Hi" }) } as unknown as Request;
    const res = await POST(req as any);

    expect(res.status).toBe(401);
    expect((await res.json()).error).toBe("Unauthorized");
  });

  it("returns validation error when message is missing", async () => {
    (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "123" } });

    const req = { json: jest.fn().mockResolvedValue({ persona: "Leader" }) } as unknown as Request;
    const res = await POST(req as any);

    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("Message is required");
  });

  it("calls askCareerCoach and returns response", async () => {
    (getServerSession as jest.Mock).mockResolvedValue({ user: { id: "123" } });
    (askCareerCoach as jest.Mock).mockResolvedValue("Your advice");

    const req = {
      json: jest.fn().mockResolvedValue({
        message: "Improve my resume",
        persona: "Analyst",
        history: [{ role: "user", content: "What should I change?" }]
      })
    } as unknown as Request;

    const res = await POST(req as any);
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.response).toBe("Your advice");
    expect(askCareerCoach).toHaveBeenCalledWith(
      "Improve my resume",
      "Analyst",
      [{ role: "user", content: "What should I change?" }]
    );
  });
});
