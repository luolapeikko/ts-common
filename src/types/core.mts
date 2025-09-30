export type IsGuard<T, Base> = T extends Base ? Extract<T, Base> : Base;

export type IsNotGuard<T, Base> = Exclude<T, Base>;

export type CoreResult<Ok, Err> =
	| {
			success: true;
			data: Ok;
	  }
	| {
			success: false;
			error: Err;
	  };
