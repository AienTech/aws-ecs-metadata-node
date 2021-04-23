import fetch from 'node-fetch';

export interface MetaData {
  Cluster: string;
  TaskARN: string;
  Family: string;
  Revision: string;
  DesiredStatus: string;
  KnownStatus: string;
  Limits: Limits;
  PullStartedAt: string;
  PullStoppedAt: string;
  AvailabilityZone: string;
  Containers?: ContainersEntity[] | null;
  LaunchType: string;
}
export interface Limits {
  CPU: number;
  Memory: number;
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
  ContainerARN: string;
  LogOptions: LogOptions;
  LogDriver: string;
}
export interface Labels {
  'com.amazonaws.ecs.cluster': string;
  'com.amazonaws.ecs.container-name': string;
  'com.amazonaws.ecs.task-arn': string;
  'com.amazonaws.ecs.task-definition-family': string;
  'com.amazonaws.ecs.task-definition-version': string;
}
export interface NetworksEntity {
  NetworkMode: string;
  IPv4Addresses?: string[] | null;
  AttachmentIndex: number;
  MACAddress: string;
  IPv4SubnetCIDRBlock: string;
  DomainNameServers?: string[] | null;
  DomainNameSearchList?: string[] | null;
  PrivateDNSName: string;
  SubnetGatewayIpv4Address: string;
}
export interface LogOptions {
  'awslogs-group': string;
  'awslogs-region': string;
  'awslogs-stream': string;
}

export async function fetchMetaData() {
  const {ECS_CONTAINER_METADATA_URI_V4} = process.env;
  if (!ECS_CONTAINER_METADATA_URI_V4) {
    throw new Error(
      'missing metadata uri in environment (ECS_CONTAINER_METADATA_URI_V4)'
    );
  }

  const response = await fetch(`${ECS_CONTAINER_METADATA_URI_V4}/task`, {
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
