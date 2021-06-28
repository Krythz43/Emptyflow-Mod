exports.id = 'delcol';
exports.title = 'Delete Column';
exports.version = '1.2.1';
exports.group = 'DATAX Test 1';
exports.author = 'Krithick';
exports.color = '#D770AD';
exports.icon = 'code';
exports.input = true;
exports.output = 1;
exports.options = {};
exports.readme = `# Specify the name of the column to be deleted
`;

exports.html = `
<div class="padding">
	<div data-jc="textbox" data-jc-path="column_name" class="m mt10">Name of Column to be deleted</div>
</div>`;

exports.install = function(instance) {

	instance.on('data', function(flowdata, next) {
		var options = instance.options;
	});
};
