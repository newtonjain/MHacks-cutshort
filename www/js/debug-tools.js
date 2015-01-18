
var debugTools = (function () {

    var debugTools = {};
    debugTools.scopes = {};
    debugTools.states = {};

    var init = function () {
        setupAutoMocks();
    };

    debugTools.autoMockValues = {};

    var setupAutoMocks = function () {
        if (localStorage.mockConnections) {
            debugTools.autoMockValues.connections = JSON.parse(localStorage.mockConnections);
        }
        if (localStorage.mockPotentialMatches) {
            debugTools.autoMockValues.potentialMatches = JSON.parse(localStorage.mockPotentialMatches);
        }
    };

    debugTools.setAutoMockConnections = function (connections) {
    	if (!connections) {
    		connections = debugTools.mockValues.connections;
    	}
        localStorage.mockConnections = JSON.stringify(connections);
        setupAutoMocks();
    };

    debugTools.setAutoMockPotentialMatches = function (potentialMatches) {
    	if (!potentialMatches) {
    		potentialMatches = debugTools.mockValues.potentialMatches;
    	}
        localStorage.mockPotentialMatches = JSON.stringify(potentialMatches);
        setupAutoMocks();
    };

    debugTools.skipLogin = function () {};

    debugTools.enableSkipLogin = function () {
        localStorage.debugSkipLogin = 'true';
    };

    debugTools.disableSkipLogin = function () {
        localStorage.debugSkipLogin = 'false';
    };
    
    debugTools.enableAll = function () {
    	debugTools.enableSkipLogin();
    	debugTools.setAutoMockConnections();
    	debugTools.setAutoMockPotentialMatches();
    };
    
    debugTools.disableMocks = function () {
    	delete localStorage.mockPotentialMatches;
    	delete localStorage.mockConnections;
    };
    
    debugTools.showNewMessagesPrompt = function() {
		debugTools.scopes.appScope.potentialMatches[0].hasNewMessages = true
		debugTools.scopes.appScope.potentialMatches[1].hasNewMessages = true
		debugTools.scopes.appScope.$apply()
    };

    init();

    return debugTools;
}());
