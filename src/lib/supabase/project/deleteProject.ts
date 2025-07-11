import { supabase } from "$lib/utils/supabaseClient";

export async function deleteProject(id: string) {
  const { data, error } = await supabase
    .from("project")
    .delete()
    .eq("id", id)
    .select(); // ✅ 必加以顯示 RLS 錯誤

  if (error) {
    console.error("❌ Supabase delete error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
    data,
  };
}
