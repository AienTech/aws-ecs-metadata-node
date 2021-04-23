import fetch from 'node-fetch';

export interface MetaData {
  Cluster: string;
  TaskARN: string;
  Family: string;
  Revision: string;
  DesiredStatus: string;
  KnownStatus: string;
  Containers?: ContainersEntity[] | null;
  Limits: Limits;
  PullStartedAt: string;
  PullStoppedAt: string;
  AvailabilityZone: string;
}
export interface ContainersEntity {
  DockerId: string;
  Name: string;
  DockerName: string;
  Image: string;
  ImageID: string;
  Labels: Labels;
  DesiredStatus: string;
  KnownStatus: string;
  Limits: Limits;
  CreatedAt: string;
  StartedAt: string;
  Type: string;
  Networks?: NetworksEntity[] | null;
}
export interface Labels {
  'com.amazonaws.ecs.cluster': string;
  'com.amazonaws.ecs.container-name': string;
  'com.amazonaws.ecs.task-arn': string;
  'com.amazonaws.ecs.task-definition-family': string;
  'com.amazonaws.ecs.task-definition-version': string;
}
export interface Limits {
  CPU: number;
  Memory: number;
}
export interface NetworksEntity {
  NetworkMode: string;
  IPv4Addresses?: string[] | null;
}

export async function fetchMetaData() {
  const {ECS_CONTAINER_METADATA_URI} = process.env;
  if (!ECS_CONTAINER_METADATA_URI) {
    throw new Error(
      'missing metadata uri in environment (ECS_CONTAINER_METADATA_URI)'
    );
  }

  const response = await fetch(`${ECS_CONTAINER_METADATA_URI}/task`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(
      `error '${response.status}' while trying to fetch the task info: ${response.statusText}`
    );
  }

  const data = (await response.json()) as MetaData;
  return data;
}
