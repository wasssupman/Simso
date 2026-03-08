import type { Metadata } from "next";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "회원가입 - 심소",
  description: "반가워요, 천천히 시작해볼까요?",
};

export default function SignupPage() {
  return <SignupForm />;
}
