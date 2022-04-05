import { Outlet } from "react-router-dom";

export default function LayoutComponent() {
  return (
    <div className="layout">
      <Outlet />
      <div>
        <h1>NAVBAR</h1>
      </div>
    </div>
  );
}
