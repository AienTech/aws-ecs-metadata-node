export * as v3 from './v3';
export * as v4 from './v4';

export enum EcsVersion {
	V3 = 'v3',
	V4 = 'v4'
}

export const CurrentEcsVersion = (): EcsVersion => {
	const { ECS_CONTAINER_METADATA_URI, ECS_CONTAINER_METADATA_URI_V4 } = process.env;

	switch (true) {
		case !!ECS_CONTAINER_METADATA_URI_V4:
			return EcsVersion.V4;
		case !!ECS_CONTAINER_METADATA_URI:
			return EcsVersion.V3;
		default:
			throw new Error(`cannot determine ecs instance version`);
	}
};