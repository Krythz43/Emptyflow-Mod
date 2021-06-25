exports.id = 'uploadcsv2';
exports.title = 'Upload CSV 2';
exports.version = '1.2.1';
exports.group = 'DATAX Test 1';
exports.author = 'Krithick';
exports.color = '#D770AD';
exports.icon = 'database';
exports.input = true;
exports.output = 2;
exports.options = {};
exports.readme = `# Uploads CSV

Double tap on the node to enter the link to CSV
`;

exports.html = `
<div class="padding">
	<div data-jc="textbox" data-jc-path="link" class="m mt10">Link to Dataset</div>
</div>`;

exports.install = function(instance) {

	instance.on('data', function(flowdata, next) {

		instance.send2(1, flowdata.clone());

		var options = instance.options;
		var link = options.link || flowdata.get('link');
		if (!link) {
			flowdata.data = { err: '[DB] No link specified' };
			next(0, flowdata);
			instance.error('[DB] No link specified');
			return;
		}

		var nosql = NOSQL(link);
		var builder;

		if (options.method === 'read') {

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

		} else if (options.method === 'insert') {

			options.addid && (flowdata.data.id = UID());
			nosql.insert(flowdata.data).callback(function(err) {
				if (err)
					instance.throw(err);
				else {
					flowdata.data = { success: err ? false : true, id: flowdata.data.id };
					next(0, flowdata);
				}
			});

		} else if (options.method === 'query') {

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

		} else if (options.method === 'update') {

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

		} else if (options.method === 'remove') {

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
