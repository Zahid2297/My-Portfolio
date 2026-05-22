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
  num: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
}

export interface SocialLink {
  name: string;
  url: string;
}
