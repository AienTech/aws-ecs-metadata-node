#!/usr/bin/env node
import { CurrentFetchMetaData } from "./index";

(async () => {
	console.log(JSON.stringify(await CurrentFetchMetaData()));
})();
