const inTri = op.inTriggerButton("Run");
const inData = op.inArray("Data");
const inK = op.inInt('Clusters', 8);

// Takes two points as arguments and returns a scalar number.
const inDistFn = op.inString("Distance function", "");
const inInit = op.inSwitch("Initialization", ["kmpp","kmrand"], "kmpp");
const inMaxIter = op.inInt('Max iterations', -1);
const inValueMapFn = op.inString('Value getter fn', '');
const inPostProc = op.inString('Post-process fn', '');

const outCent = op.outArray("Centroids");
const outLabels = op.outArray('Labels');
const outData = op.outArray('Post processed data');

op.setPortGroup("Advanced settings", [inDistFn, inInit, inMaxIter, inValueMapFn, inPostProc]);

inTri.onTriggered = run;

let kmeans = null;

function run() {
    if (!window.Clusterer) {
        op.logError('Clusterer library not loaded');
        return;
    }

    outCent.set(null);
    outLabels.set(null);
    outData.set(null);

    let data = inData.get();
    if (!data) {
        return;
    }

    const k = Math.min(data.length - 1, Math.max(1, inK.get()));
    const dist = inDistFn.get() || null;
    const max = inMaxIter.get();

    kmeans = window.Clusterer.createKmeans(k, {
        initialization: inInit.get(),
        maxIterations: max === -1? null : max,
        valueGetter: inValueMapFn.get() || null,
        postProcessing: inPostProc.get() || null
    })(data).then(results => {
        if (results) {
            outCent.set(results.centroids);
            outLabels.set(results.labels);
            outData.set(results.postProcessing);
        }
    }).catch(err => {
        op.logError(err);
        outCent.set(null);
        outLabels.set(null);
        outData.set(null);
    });
}