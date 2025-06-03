import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function Home() {
  return <Button>Senna Dev - Doutor Agenda!</Button>;
  redirect("/dashboard");
}
