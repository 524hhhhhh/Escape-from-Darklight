import React from "react";
import type { WorldState } from "@/types/world-state";
import { SwitchItem } from "../trigger/switch-item";
import { DoorItem } from "../trigger/door-item";

type Props = { world: WorldState };

export function TriggerGroundView({ world }: Props) {
  const { map, triggers, view } = world;
  const switchList = [...triggers.switches.values()];

  return (
    <>
      {switchList.map((swt) => (
        <SwitchItem key={swt.id} swt={swt} map={map} view={view} />
      ))}
    </>
  );
}

export function TriggerDoorView({ world }: Props) {
  const { map, triggers, view } = world;
  const doorList = [...triggers.doors.values()];

  return (
    <>
      {doorList.map((door) => (
        <DoorItem key={door.id} door={door} map={map} view={view} />
      ))}
    </>
  );
}
