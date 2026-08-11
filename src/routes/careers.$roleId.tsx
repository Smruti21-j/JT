import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/careers/$roleId")({
  component: RoleLayout,
});

function RoleLayout() {
  return <Outlet />;
}