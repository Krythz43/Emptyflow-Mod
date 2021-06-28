exports.id = 'splitdelim';
exports.title = 'Split On Delimiter';
exports.version = '1.2.1';
exports.group = 'DATAX Test 1';
exports.author = 'Krithick';
exports.color = '#D770AD';
exports.icon = 'code';
exports.input = true;
exports.output = 1;
exports.options = {};
exports.readme = `# Splitting Column on the basis of a Delimiter

Double tap on the icon and proceed with

- Adding the Column Name for Split
- Specifying the required Delimitter

`;

exports.html = `
<div class="padding">
	<div data-jc="textbox" data-jc-path="column_name" class="m mt10">Mention Column name here</div>
	<div data-jc="dropdown" data-jc-path="delimiter" data-jc-config="required:true;items: ,-,_,*,." class="m">@(Delimitter)</div>
</div>`;

exports.install = function(instance) {

	instance.on('data', function(flowdata, next) {

		instance.send2(1, flowdata.clone());

		var options = instance.options;
		var column = options.column || flowdata.get('column');
		if (!column) {
			flowdata.data = { err: '[DB] No column specified' };
			next(0, flowdata);
			instance.error('[DB] No column specified');
			return;
		}

		var nosql = NOSQL(column);
		var builder;

		if (options.delimitter === 'read') {

			if (!flowdata.data.id) {
				flowdata.data = { err: '[DB] Cannot get record by id: `undefined`' };
				next(0, flowdata);
				instance.error('[DB] Cannot get record by id: `undefined`');
				return;
			}

			builder = nosql.find();
			builder.where('id', flowdata.data.id);
			builder.first();
			builder.callback(function(err, response) {
				if (err) {
					instance.throw(err);
				} else {
					flowdata.data = { response: response };
					next(0, flowdata);
				}
			});

		} else if (options.delimitter === 'insert') {

			options.addid && (flowdata.data.id = UID());
			nosql.insert(flowdata.data).callback(function(err) {
				if (err)
					instance.throw(err);
				else {
					flowdata.data = { success: err ? false : true, id: flowdata.data.id };
					next(0, flowdata);
				}
			});

		} else if (options.delimitter === 'query') {

			var query = flowdata.data;
			builder = nosql.find();

			query && query instanceof Array && query.forEach(function(q) {
				if (q instanceof Array) {
					var m = q[0];
					var args = q.splice(1);
					builder[m] && (builder[m].apply(builder, args));
				}
			});

			builder.callback(function(err, response) {
				if (err) {
					instance.throw(err);
				} else {
					flowdata.data = { response: response || [] };
					next(0, flowdata);
				}
			});

		} else if (options.delimitter === 'update') {

			if (!options.upsert && !flowdata.data.id) {
				flowdata.data = { err: '[DB] Cannot update record by id: `undefined`' };
				next(0, flowdata);
				instance.error('[DB] Cannot update record by id: `undefined`');
				return;
			}

			if (options.upsert && (options.upsertid && !flowdata.data.id)) {
				flowdata.data.id = UID();
				builder = nosql.modify(flowdata.data, options.upsert);
				builder.where('id', flowdata.data.id);
				builder.callback(function(err, count) {
					if (err)
						instance.throw(err);
					else {
						flowdata.data = { response: count || 0 };
						next(0, flowdata);
					}
				});
			}

		} else if (options.delimitter === 'remove') {

			if (!flowdata.data.id) {
				flowdata.data = { err: '[DB] Cannot remove record by id: `undefined`' };
				next(0, flowdata);
				instance.error('[DB] Cannot remove record by id: `undefined`');
				return;
			}

			builder = nosql.remove();
			builder.where('id', flowdata.data.id);
			builder.callback(function(err, count) {
				if (err)
					instance.throw(err);
				else {
					flowdata.data = { response: count || 0 };
					next(0, flowdata);
				}
			});
		}

	});
};
