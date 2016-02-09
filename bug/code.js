
var myTemplateConfig = {
    colors: ['#FFB900','#D83B01','#B4009E','#5C2D91','#0078d7','#008272','#107C10'],
    branch: {
        lineWidth: 8,
        spacingX: 50
    },
    commit: {
        spacingY: -80,
        dot: {
            size: 12
        },
        message: {
            displayAuthor: true,
            displayBranch: false,
            displayHash: false,
            font: "normal 12pt Arial"
        },
        tooltipHTMLFormatter: function (commit) {
            return commit.message;
        }
    }
};
var myTemplate = new GitGraph.Template(myTemplateConfig);

var s4 = function(){
  return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
};

var Guid = function(){
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
             s4() + '-' + s4() + s4() + s4();
};

var config = {
    elementId: 'conversation-graph',
    template: myTemplate,
    mode: "compact"
};
var gitGraph = new GitGraph(config);

var processTree = function(tree,currentBranch) {
    currentBranch.commit(tree.Id);
    var toKeepBranch = [currentBranch];
    for (var j = 0; j < tree.Children.length; j++) {
       toKeepBranch.push(currentBranch.branch(Guid()));
    }

    for (var i = 0; i < tree.Children.length; i++) {
       processTree(tree.Children[i], toKeepBranch[i]);
    }
}

var branch = gitGraph.orphanBranch(Guid());
processTree(tree, branch);
