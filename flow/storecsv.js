exports.id = 'loadcsv';
exports.title = 'Load To Warehouse';
exports.version = '1.2.1';
exports.group = 'DATAX Test 1';
exports.author = 'Krithick';
exports.color = '#D770AD';
exports.icon = 'database';
exports.input = true;
exports.output = 1;
exports.options = {};
exports.readme = `# Stores the incoming CSV to Data WareHouse
`;

exports.html = `
<div class="padding">
	<div data-jc="textbox" data-jc-path="link" class="m mt10">Enter the link to store this in</div>
</div>`;

exports.install = function(instance) {

	instance.on('data', function(flowdata, next) {
		var options = instance.options;
	});
};
