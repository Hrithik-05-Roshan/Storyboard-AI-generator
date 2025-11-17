export interface SceneDescription {
  scene_description: string;
  image_prompt: string;
}

export interface StoryboardScene extends SceneDescription {
  imageUrl: string;
}
