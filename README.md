# A library for nodejs

`aws-ecs-metadata-node` is a NodeJS library to fetch and retrieve the meta data of a ECS service. There's also [another version built for golang](https://github.com/BrunoScheufler/aws-ecs-metadata-go) by [Bruno Scheufler](https://github.com/BrunoScheufler)

## Installation

Use the package manager [npm](https://npmjs.org/) to install `aws-ecs-metadata-node`.

```bash
npm install aws-ecs-metadata-node
```

or with [yarn](https://yarnpkg.com/):

```bash
yarn add aws-ecs-metadata-node
```

## Usage

```javascript
import { fetchMetaData as v3 } from 'aws-ecs-metadata-node/lib/v3';
import { fetchMetaData as v4 } from 'aws-ecs-metadata-node/lib/v4';

// to fetch from version 3 endpoint
v3().then((res) => {
	console.log(res);
});

// to fetch from version 4 endpoint
v4().then((res) => {
	console.log(res);
});
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
