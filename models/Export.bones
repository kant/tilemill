// Export
// ------
// Model. Describes a single export task, e.g. rendering a map to a PDF.
model = Backbone.Model.extend({
    schema: {
        'type': 'object',
        'properties': {
            'id': {
                'type': 'string',
                'required': true
            },
            'project': {
                'type': 'string',
                'required': true
            },
            'format': {
                'type': 'string',
                'required': true,
                'enum': ['png', 'pdf', 'mbtiles']
            },
            'status': {
                'type': 'string',
                'required': true,
                'enum': ['waiting', 'processing', 'complete', 'error']
            },
            'progress': {
                'type': 'number',
                'minimum': 0,
                'maximum': 1
            },
            'filename': {
                'type': 'string',
                'pattern': '^[A-Za-z0-9\-_.]+$'
            },
            'created': {
                'type': 'integer'
            },
            'updated': {
                'type': 'integer'
            },
            'error': {
                'type': 'string'
            }
        }
    },
    initialize: function() {
        if (this.isNew()){
            this.set({
                created: +new Date,
                id: (+new Date) + ''
            }, {silent: true});
        }
    },
    url: function() {
        return 'api/Export/' + this.id;
    },
    defaults: {
        progress: 0,
        status: 'waiting'
    },
    // Generate a download URL for an Export.
    downloadURL: function() {
        return (this.get('status') === 'complete') && 'export/download/' + this.get('filename');
    },
    // Get the duration of the current export job.
    time: function() {
        if (this.get('updated')) {
            var seconds = parseInt((this.get('updated') - this.get('created')) * .001, 10);
            var minutes = parseInt(seconds / 60, 10);
            var remainder = seconds - (minutes * 60);
            if (minutes && remainder) {
                return minutes + ' min ' + remainder + ' sec';
            } else if (minutes) {
                return minutes + ' min';
            } else {
                return seconds + ' sec';
            }
        }
        return '0 sec';
    }
});

