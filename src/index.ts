import * as v3 from './v3';
import * as v4 from './v4';
export { v3, v4 };

export enum EcsVersion {
	V3 = 'v3',
	V4 = 'v4'
}

export const CurrentEcsVersion = (): EcsVersion => {
	const { ECS_CONTAINER_METADATA_URI, ECS_CONTAINER_METADATA_URI_V4 } = process.env;

	switch (true) {
		case ECS_CONTAINER_METADATA_URI_V4 !== "":
			return EcsVersion.V4;
		case ECS_CONTAINER_METADATA_URI !== "":
			return EcsVersion.V3;
		default:
			throw new Error(`cannot determine ecs instance version`);
	}
};

export const CurrentFetchMetaData = () => {
	let fn: () => Promise<v3.MetaData | v4.MetaData> = v4.fetchMetaData;
	switch (CurrentEcsVersion()) {
		case EcsVersion.V3:
			fn = v3.fetchMetaData;
	}
	return fn();
};
