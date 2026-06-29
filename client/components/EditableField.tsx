"use client";

import { useState } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type EditableFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  value?: string | number | null;
  placeholder?: string;
  control: Control<T>;
  onSave: () => void;
};

export function EditableField<T extends FieldValues>({
  name,
  label,
  value,
  placeholder,
  control,
  onSave,
}: EditableFieldProps<T>) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{label}</p>

        {editing ? (
          <div className="mt-2 flex gap-2">
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value ?? ""}
                  placeholder={placeholder}
                />
              )}
            />

            <Button
              type="button"
              onClick={() => {
                onSave();
                setEditing(false);
              }}
            >
              Save
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => setEditing(false)}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <p className="mt-1">{value || "Not provided"}</p>
        )}
      </div>

      {!editing && (
        <Button type="button" variant="ghost" onClick={() => setEditing(true)}>
          Edit
        </Button>
      )}
    </div>
  );
}
