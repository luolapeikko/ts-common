export type IsGuard<T, Base> = T extends Base ? Extract<T, Base> : Base;

export type IsNotGuard<T, Base> = Exclude<T, Base>;

export type CoreResult<T> =
	| {
			success: true;
			data: T;
	  }
	| {
			success: false;
			error: TypeError;
	  };
