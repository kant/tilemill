// ExportList
// ----------
// Collection. List of all Exports.
model = Backbone.Collection.extend({
    model: models.Export,
    url: 'api/Export',
    comparator: function(job) {
        return job.get('created');
    }
});

