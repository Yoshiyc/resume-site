import type { PageServerLoad } from './$types.js';
import type { Project } from '$lib/utils/supabaseClient';

export interface PageData {
  projects: Project[];
}

export type { PageServerLoad };
