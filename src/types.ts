/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Skill {
  name: string;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl: string;
  category: "work" | "personal" | "progress";
}

export interface SocialLink {
  name: string;
  url: string;
}
