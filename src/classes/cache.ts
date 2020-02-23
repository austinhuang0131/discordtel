import { Collection } from "discord.js";
import { ReqlClient } from "rethinkdbdash";
import { modelFound } from "./modelFound";

interface options {
	tableName: string;
	r: ReqlClient;
}

export default class DBInterface {
	public cache = new Collection();
	public tableName: string;
	public r: ReqlClient;
	constructor(options: options) {
		this.tableName = options.tableName;
		this.r = options.r;
		Object.assign(this, this.cache)
	}

	async get(id: string | number): Promise<modelFound | null> {
		let res: unknown = this.cache.get(id);
		if (res) return new modelFound({
			tableName: this.tableName,
			r: this.r,
			cached: res,
			cache: this.cache,
		});
		// TODO: Someone who understands TS pls remove this repetition somehow.
		res = await this.r.table(this.tableName).get(id).default(null);
		if (res) {
			this.cache.set(id, res);
			return new modelFound({
				tableName: this.tableName,
				r: this.r,
				cached: res,
				cache: this.cache,
			});
		}
		return null;
	}
}