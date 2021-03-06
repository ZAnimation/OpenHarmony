//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//
//                            openHarmony Library v0.01
//
//
//         Developped by Mathieu Chaptel, Chris Fourney...
//
//
//   This library is an open source implementation of a Document Object Model
//   for Toonboom Harmony. It also implements patterns similar to JQuery
//   for traversing this DOM.
//
//   Its intended purpose is to simplify and streamline toonboom scripting to
//   empower users and be easy on newcomers, with default parameters values,
//   and by hiding the heavy lifting required by the official API.
//
//   This library is provided as is and is a work in progress. As such, not every
//   function has been implemented or is garanteed to work. Feel free to contribute
//   improvements to its official github. If you do make sure you follow the provided
//   template and naming conventions and document your new methods properly.
//
//   This library doesn't overwrite any of the objects and classes of the official
//   Toonboom API which must remains available.
//
//   This library is made available under the MIT license.
//   https://opensource.org/licenses/mit
//
//   The repository for this library is available at the address:
//   https://github.com/cfourney/OpenHarmony/
//
//
//   For any requests feel free to contact m.chaptel@gmail.com
//
//
//
//
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////
//////////////////////////////////////
//                                  //
//                                  //
//          $.oScene class          //
//                                  //
//                                  //
//////////////////////////////////////
//////////////////////////////////////


//TODO: Metadata, settings, aspect, camera peg, view.
/**
 * The constructor for $.oScene.
 * @classdesc
 * The base Class to access all the contents of the scene, and add elements. <br>This is the main class to do exporting operations as well as column/element/palette creation.
 * @constructor
 * @example
 * // Access to the direct dom object. Available and automatically instantiated as $.getScene, $.scene, $.scn, $.s
 * var doc = $.getScene ;
 * var doc = $.scn ;
 * ver doc = $.s ;         // all these are equivalents
 *
 * // To grab the scene from a QWidget Dialog callback, store the $ object in a local variable to access all the fonctions from the library.
 * function myCallBackFunction(){
 *   var this.$ = $;
 *
 *   var doc = this.$.scn;
 * }
 *
 *
 */
$.oScene = function( ){
    // $.oScene.nodes property is a class property shared by all instances, so it can be passed by reference and always contain all nodes in the scene

    //var _topNode = new this.$.oNode("Top");
    //this.__proto__.nodes = _topNode.subNodes(true);

  this._type = "scene";
}


//-------------------------------------------------------------------------------------
//--- $.oScene Objects Properties
//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------


/**
 * The folder that contains this scene.
 * @name $.oScene#path
 * @type {$.oFolder}
 */
Object.defineProperty($.oScene.prototype, 'path', {
    get : function(){
        return new this.$.oFolder( scene.currentProjectPath() );
    },
    set : function(val){
        throw "Not yet implemented"; //Perhaps a save as/save new version?
    }
});

/**
 * The stage file of the scene.
 * @name $.oScene#stage
 * @type {$.oFile}
 */
Object.defineProperty($.oScene.prototype, 'stage', {
    get : function(){
        return this.path + "/" + scene.currentVersionName() + ".xstage";
    },
    set : function(val){
        throw "Not yet implemented"; //Perhaps a save as/save new version?
    }
});

/**
 * The name of the scene.
 * @name $.oScene#name
 * @readonly
 * @type {string}
 */
Object.defineProperty($.oScene.prototype, 'name', {
    get : function(){
        return scene.currentScene();
    }/*,
    set : function(val){
        throw "Not yet implemented";
    }*/
});


/**
 * The sceneName file of the scene.
 * @Deprecated
 * @readonly
 * @name $.oScene#sceneName
 * @type {string}
 */
Object.defineProperty($.oScene.prototype, 'sceneName', {
    get : function(){
        return scene.currentScene();
    }/*,
    set : function(val){
        throw "Not yet implemented";
    }*/
});



/**
 * The startframe to the playback of the scene.
 * @name $.oScene#startPreview
 * @type {int}
 */
Object.defineProperty($.oScene.prototype, 'startPreview', {
    get : function(){
        return scene.getStartFrame();
    },
    set : function(val){
        scene.setStartFrame( val );
    }
});

/**
 * The stopFrame to the playback of the scene.
 * @name $.oScene#stopPreview
 * @type {int}
 */
Object.defineProperty($.oScene.prototype, 'stopPreview', {
    get : function(){
        return scene.getStopFrame();
    },
    set : function(val){
        scene.setStopFrame( val );
    }
});

/**
 * The frame rate of the scene.
 * @name $.oScene#framerate
 * @type {float}
 */
Object.defineProperty($.oScene.prototype, 'framerate', {
    get : function(){
        return scene.getFrameRate();
    },
    set : function(val){
        return scene.setFrameRate( val );
    }
});


/**
 * The horizontal aspect ratio.
 * @name $.oScene#aspectRatioX
 * @type {double}
 */
Object.defineProperty($.oScene.prototype, 'aspectRatioX', {
    get : function(){
        return scene.unitsAspectRatioX();
    },
    set : function(val){
        scene.setUnitsAspectRatio( val, this.aspectRatioY );
    }
});

/**
 * The vertical aspect ratio.
 * @name $.oScene#aspectRatioY
 * @type {double}
 */
Object.defineProperty($.oScene.prototype, 'aspectRatioY', {
    get : function(){
        return scene.unitsAspectRatioY();
    },
    set : function(val){
        scene.setUnitsAspectRatio( this.aspectRatioY, val );
    }
});

/**
 * The horizontal unit count.
 * @name $.oScene#unitsX
 * @type {double}
 */
Object.defineProperty($.oScene.prototype, 'unitsX', {
    get : function(){
        return scene.numberOfUnitsX();
    },
    set : function(val){
        scene.setNumberOfUnits( val, this.unitsY, this.unitsZ );
    }
});

/**
 * The vertical unit count.
 * @name $.oScene#unitsY
 * @type {double}
 */
Object.defineProperty($.oScene.prototype, 'unitsY', {
    get : function(){
        return scene.numberOfUnitsY();
    },
    set : function(val){
        scene.setNumberOfUnits( this.unitsX, val, this.unitsZ );
    }
});

/**
 * The depth unit count.
 * @name $.oScene#unitsZ
 * @type {double}
 */
Object.defineProperty($.oScene.prototype, 'unitsZ', {
    get : function(){
        return scene.numberOfUnitsZ();
    },
    set : function(val){
        scene.setNumberOfUnits( this.unitsX, this.unitsY, val );
    }
});


/**
 * The center coordinates of the scene.
 * @name $.oScene#center
 * @type {$.oPoint}
 */
Object.defineProperty($.oScene.prototype, 'center', {
    get : function(){
        return new this.$.oPoint( scene.coordAtCenterX(), scene.coordAtCenterY(), 0.0 );
    },
    set : function( val ){
        scene.setCoordAtCenter( val.x, val.y );
    }
});



/**
 * The horizontal resolution.
 * @name $.oScene#resolutionX
 * @readonly
 * @type {int}
 */
Object.defineProperty($.oScene.prototype, 'resolutionX', {
    get : function(){
        return scene.currentResolutionX();
    }
});

/**
 * The vertical resolution.
 * @name $.oScene#resolutionY
 * @type {int}
 */
Object.defineProperty($.oScene.prototype, 'resolutionY', {
    get : function(){
        return scene.currentResolutionY();
    }
});

/**
 * The default horizontal resolution.
 * @name $.oScene#defaultResolutionX
 * @type {int}
 */
Object.defineProperty($.oScene.prototype, 'defaultResolutionX', {
    get : function(){
        return scene.defaultResolutionX();
    },
    set : function(val){
        scene.setDefaultResolution( val, this.defaultResolutionY, this.fov );
    }
});

/**
 * The default vertical resolution.
 * @name $.oScene#defaultResolutionY
 * @type {int}
 */
Object.defineProperty($.oScene.prototype, 'defaultResolutionY', {
    get : function(){
        return scene.defaultResolutionY();
    },
    set : function(val){
        scene.setDefaultResolution( this.defaultResolutionX, val, this.fov );
    }
});

/**
 * The field of view of the scene.
 * @name $.oScene#fov
 * @type {double}
 */
Object.defineProperty($.oScene.prototype, 'fov', {
    get : function(){
        return scene.defaultResolutionFOV();
    },
    set : function(val){
        scene.setDefaultResolution( this.defaultResolutionX, this.defaultResolutionY, val );
    }
});


/**
 * Whether the scene contains unsaved changes.
 * @name $.oScene#unsaved
 * @readonly
 * @type {bool}
 */
Object.defineProperty($.oScene.prototype, 'unsaved', {
    get : function(){
        return scene.isDirty();
    }
});



/**
 * The root group of the scene.
 * @name $.oScene#root
 * @readonly
 * @type {$.oGroupNode}
 */
Object.defineProperty($.oScene.prototype, 'root', {
    get : function(){
        var _topNode = this.getNodeByPath( "Top" );
        return _topNode
    }
});





/**
 * Contains the list of all the nodes present in the scene.
 * @name $.oScene#nodes
 * @readonly
 * @type {$.oNode[]}
 */
Object.defineProperty($.oScene.prototype, 'nodes', {
    get : function(){
        var _topNode = this.root;
        return _topNode.subNodes( true );
    }
});

/**
 * Contains the list of columns present in the scene.
 * @name $.oScene#columns
 * @readonly
 * @type {$.oColumn[]}
 * @todo add attribute finding to get complete column objects
 */
Object.defineProperty($.oScene.prototype, 'columns', {
    get : function(){
        var _columns = [];
        for (var i=0; i<columns.numberOf(); i++){
            _columns.push( this.$column(column.getName(i)) );
        }
        return _columns;
    }
});


/**
 * Contains the list of scene palettes present in the scene.
 * @name $.oScene#palettes
 * @readonly
 * @type {$.oPalette[]}
 */
Object.defineProperty($.oScene.prototype, 'palettes', {
    get : function(){
      this.$.log("getting palettes")
        var _paletteList = PaletteObjectManager.getScenePaletteList();
        this.$.log("palette list acquired")
        var _palettes = [];
        for (var i=0; i<_paletteList.numPalettes; i++){
            _palettes.push( new this.$.oPalette( _paletteList.getPaletteByIndex(i), _paletteList ) );
        }
        return _palettes;
    }
});


/**
 * Contains the list of elements present in the scene. Element ids can appear more than once if they are used by more than one Drawing column
 * @name $.oScene#elements
 * @readonly
 * @type {$.oElement[]}
 */
Object.defineProperty($.oScene.prototype, 'elements', {
  get : function(){
    var _elements = [];
    var _columns = this.columns;
    var _ids = [];
    for (var i in _columns){
      if (_columns.type != "DRAWING") continue;
      var _element = _columns[i].element
      _elements.push(_element);
      if (_ids.indexOf(_element.id) == -1) _ids.push (_element.id);
    }

    // adding the elements not linked to columns
    var _elementNum = element.numberOf();
    for (var i = 0; i<_elementNum; i++){
      var _id = element.id(i);
      if (_ids.indexOf(_id) == -1) {
        _elements.push(new this.$.oElement(_id));
        _ids.push (_id)
      }
    }
  }
});



/**
 * The length of the scene.
 * @name $.oScene#length
 * @type {int}
 */
Object.defineProperty($.oScene.prototype, 'length', {
    get : function(){
        return frame.numberOf()
    },

    set : function (newLength){
        var _length = frame.numberOf();
        var _toAdd = newLength-_length;
        if (_toAdd>0){
            frame.insert(_length-1, _toAdd)
        }else{
            frame.remove(_length-1, _toAdd)
        }
    }
});


/**
 * The current frame of the scene.
 * @name $.oScene#currentFrame
 * @type {int}
 */
Object.defineProperty($.oScene.prototype, 'currentFrame', {
    get : function(){
        return frame.current();
    },

    set : function( frm ){
        return frame.setCurrent( frm );
    }
});


/**
 * The current frame of the scene.
 * @name $.oScene#defaultDisplay
 * @type {oNode}
 */
Object.defineProperty($.oScene.prototype, 'defaultDisplay', {
    get : function(){
      return this.getNodeByPath(scene.getDefaultDisplay());
    },

    set : function(newDisplay){
      node.setAsGlobalDisplay(newDisplay.path);
    }
});


//-------------------------------------------------------------------------------------
//--- $.oScene Objects Methods
//-------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------


/**
 * Gets a node by the path.
 * @param   {string}   fullPath         The path of the node in question.
 *
 * @return {$.oNode}                    The node found given the query.
 */
$.oScene.prototype.getNodeByPath = function(fullPath){
    var _type = node.type(fullPath);
    if (_type == "") return null; // TODO: remove this if we implement a .exists property for oNode

    if( this.$.cache_oNode[fullPath] ){
      //Check for consistent type.
      if ( this.$.cache_oNode[fullPath].type == _type ){
        return this.$.cache_oNode[fullPath];
      }
    }

    var _node;
    switch(_type){
      case "READ" :
        _node = new this.$.oDrawingNode( fullPath, this );
        break;
      case "PEG" :
        _node = new this.$.oPegNode( fullPath, this );
        break;
      case "GROUP" :
        _node = new this.$.oGroupNode( fullPath, this );
        break;
      default:
        _node = new this.$.oNode( fullPath, this );
    }

    this.$.cache_oNode[fullPath] = _node;
    return _node;
}

/**
 * Gets a column by the name.
 * @param  {string}             uniqueName               The unique name of the column as a string.
 * @param  {$.oAttribute}       oAttributeObject         The oAttributeObject owning the column.
 * @todo   cache and find attribute if it is missing
 *
 * @return {$.oColumn}                    The node found given the query.
 */
$.oScene.prototype.getColumnByName = function( uniqueName, oAttributeObject ){
    var _type = column.type(uniqueName);

    switch (_type) {
        case "" :
            return null;
        case "DRAWING" :
            return new this.$.oDrawingColumn(uniqueName, oAttributeObject);
        default :
            return new this.$.oColumn(uniqueName, oAttributeObject);
    }
}


/**
 * Gets a node by the path.
 * @param  {bool}   recurse            Whether to recurse into groups.
 *
 * @return {$.oNode[]}                 The selected nodes.
 */
$.oScene.prototype.getSelectedNodes = function( recurse, sortResult ){
    if (typeof recurse === 'undefined') var recurse = false;
    if (typeof sort_result === 'undefined') var sortResult = false;     //Avoid sorting, save time, if unnecessary and used internally.

    var _selection = selection.selectedNodes();

    var _selectedNodes = [];
    for (var i = 0; i<_selection.length; i++){

        var _oNodeObject = this.$node(_selection[i])

        _selectedNodes.push(_oNodeObject)
        if (recurse && node.isGroup(_selection[i])){
            _selectedNodes = _selectedNodes.concat(_oNodeObject.subNodes(recurse))
        }
    }

    // sorting by timeline index
    if( sortResult ){
      var _timeline = this.getTimeline();
      _selectedNodes = _selectedNodes.sort(function(a, b){return a.timelineIndex(_timeline)-b.timelineIndex(_timeline)})
    }

    return _selectedNodes;
}


/**
 * Searches for a node based on the query.
 * @param   {string}   query            The query for finding the node[s].
 *
 * @return {$.oNode[]}                 The node[s] found given the query.
 */
$.oScene.prototype.nodeSearch = function( query, sort_result ){
  if (typeof sort_result    === 'undefined') var sort_result = true;     //Avoid sorting, save time, if unnecessary and used internally.

  //-----------------------------------
  //Breakdown with regexp as needed, find the query details.
  //-----------------------------------

  // NAME, NODE, WILDCARDS, ATTRIBUTE VALUE MATCHING, SELECTION/OPTIONS, COLOURS

  //----------------------------------------------
  // -- PATH/WILDCARD#TYPE[ATTRIBUTE:VALUE,ATTRIBUTE:VALUE][OPTION:VALUE,OPTION:VALUE]
  // ^(.*?)(\#.*?)?(\[.*\])?(\(.*\))?$

  //ALLOW USAGE OF AN INPUT LIST, LIST OF NAMES, OR OBJECTS,

  //--------------------------------------------------
  //-- EASY RETURNS FOR FAST OVERLOADS.

  //* -- OVERRIDE FOR ALL NODES

  if( query == "*" ){
    return this.nodes;

  //(SELECTED) SELECTED -- OVERRIDE FOR ALL SELECTED NODES
  }else if( query == "(SELECTED)" || query == "SELECTED" ){

    return this.getSelectedNodes( true, sort_result );

  //(NOT SELECTED) !SELECTED NOT SELECTED -- OVERRIDE FOR ALL SELECTED NODES

  }else if( query == "(NOT SELECTED)" ||
            query == "NOT SELECTED"   ||
            query == "(! SELECTED)"   ||
            query == "! SELECTED"     ||
            query == "(UNSELECTED)"   ||
            query == "UNSELECTED"
          ){

    var nodes_returned = [];

    var sel_list = {};
    for( var p=0;p<selection.numberOfNodesSelected();p++ ){
      sel_list[ selection.selectedNode(p) ] = true;
    }

    var all_nodes = this.nodes;
    for( var x=0;x<all_nodes.length;x++ ){
      if( !sel_list[ all_nodes[x].path ] ){
        var node_ret = this.getNodeByPath( all_nodes[x].path );
        if( node_ret && node_ret.exists ){
          nodes_returned.push( node_ret );
        }
      }
    }

    if( sort_result ){
      var _timeline = this.getTimeline();
      nodes_returned = nodes_returned.sort(function(a, b){return a.timelineIndex(_timeline)-b.timelineIndex(_timeline)})
    }
    return nodes_returned;
  }


  //FULL QUERIES.
  var regexp = /^(.*?)(\#.*?)?(\[.*\])?(\(.*\))?$/;
  var query_match = query.match( regexp );

  this.$.debug( "QUERYING: " + query, this.$.DEBUG_LEVEL.LOG );
  this.$.debug( "QUERYING: " + query_match.length, this.$.DEBUG_LEVEL.LOG );

  var nodes_returned = [];

  if( query_match && query_match.length > 1 && query_match[1] && query_match[1].length > 0 ){
    //CONSIDER A LIST, COMMA SEPARATION, AND ESCAPED COMMAS.
    var query_list = [];
    var last_str   = '';
    var split_list = query_match[1].split( "," );

    for( var n=0; n<split_list.length; n++ ){
      var split_val = split_list[n];
      if( split_val.slice( split_val.length-1, split_val.length ) == "\\" ){
        last_str += split_val + ",";

      }else{
        query_list.push( last_str + split_val );
        last_str = "";
      }
    }

    if( last_str.length>0 ){
      query_list.push( last_str );
    }

    this.$.debug( "GETTING NODE LIST FROM QUERY", this.$.DEBUG_LEVEL.LOG );
    //NOW DEAL WITH WILDCARDS

    var added_nodes = {}; //Add the full path to a list when adding/querying existing. Prevent duplicate attempts.
    var all_nodes = false;
    for( var x=0; x<query_list.length; x++ ){
      if( (query_list[x].indexOf("*")>=0) || (query_list[x].indexOf("?")>=0) ){
        //THERE ARE WILDCARDS.
        this.$.debug( "WILDCARD NODE QUERY: "+query_list[x], this.$.DEBUG_LEVEL.LOG );
        //Make a wildcard search for the nodes.

        if( all_nodes === false ){
          all_nodes = this.nodes;
        }

        //Run the Wildcard regexp against the available nodes.
        var regexp = query_list[x];
            regexp = regexp.split( "?" ).join( "." );
            regexp = regexp.split( "*" ).join( ".*?" );
            regexp = '^'+regexp+'$';

        this.$.debug( "WILDCARD QUERY REGEXP: "+regexp, this.$.DEBUG_LEVEL.LOG );

        var regexp_filter = RegExp( regexp, 'gi' );
        for( var n=0;n<all_nodes.length;n++ ){
          if( !added_nodes[all_nodes[n].path] ){
            this.$.debug( "WILDCARD NODE TEST: "+all_nodes[n].path, this.$.DEBUG_LEVEL.LOG );
            if( regexp_filter.test( all_nodes[n].path ) ){
              this.$.debug( "WILDCARD NODE TESTED SUCCESS: "+all_nodes[n].path, this.$.DEBUG_LEVEL.LOG );

              var node_ret = all_nodes[n]; //this.getNodeByPath( all_nodes[n].path ); //new this.$.oNode( this.$, all_nodes[n].path );
              if( node_ret && node_ret.exists ){
                this.$.debug( "WILDCARD NODE MATCH: "+all_nodes[n].path+"\n", this.$.DEBUG_LEVEL.LOG );
                nodes_returned.push( node_ret );
              }
              added_nodes[ all_nodes[n].path ] = true;
            }
          }
        }

      }else if( query_list[x].length >=3 && query_list[x]=="re:" ){
        //THERE ARE WILDCARDS.
        this.$.debug( "REGEXP NODE QUERY: "+query_list[x], this.$.DEBUG_LEVEL.LOG );
        //Make a wildcard search for the nodes.

        if( all_nodes === false ){
          all_nodes = this.nodes;
        }

        //Run the Wildcard regexp against the available nodes.
        var regexp = query_list[x];
        this.$.debug( "REGEXP QUERY REGEXP: "+regexp, this.$.DEBUG_LEVEL.LOG );

        var regexp_filter = RegExp( regexp, 'gi' );
        for( var n=0;n<all_nodes.length;n++ ){
          if( !added_nodes[all_nodes[n].path] ){
            this.$.debug( "REGEXP NODE TEST: "+all_nodes[n].path, this.$.DEBUG_LEVEL.LOG );
            if( regexp_filter.test( all_nodes[n].path ) ){
              this.$.debug( "REGEXP NODE TESTED SUCCESS: "+all_nodes[n].path, this.$.DEBUG_LEVEL.LOG );

              var node_ret = all_nodes[n]; //new this.$.oNode( this.$, all_nodes[n].path );
              if( node_ret && node_ret.exists ){
                this.$.debug( "REGEXP NODE MATCH: "+all_nodes[n].path+"\n", this.$.DEBUG_LEVEL.LOG );
                nodes_returned.push( node_ret );
              }
              added_nodes[ all_nodes[n].path ] = true;
            }
          }
        }
      }else{
        //ITS JUST THE EXACT NODE.
        this.$.debug( "EXACT NODE QUERY: "+query_list[x], this.$.DEBUG_LEVEL.LOG );

        var node_ret = this.getNodeByPath( query_list[x] ); //new this.$.oNode( this.$, query_list[x] );
        if( !added_nodes[ query_list[x] ] ){
          if( node_ret && node_ret.exists ){
            this.$.debug( "EXACT NODE MATCH: "+query_list[x]+"\n", this.$.DEBUG_LEVEL.LOG );
            nodes_returned.push( node_ret );
          }
          added_nodes[ query_list[x] ] = true;
        }
      }
    }
  }else{
    nodes_returned = this.nodes;
  }

  this.$.debug( "FILTER CODE", this.$.DEBUG_LEVEL.LOG );

  //-----------------------------------------------------
  //IT HAS SOME SORT OF FILTER ASSOCIATED WITH THE QUERY.
  if( query_match.length > 2 ){
    var filtered_nodes = nodes_returned;
    for( var n=2;n<query_match.length;n++ ){
      //RUN THE FITERS.

      if( !query_match[n] ){
        continue;
      }

      if( query_match[n].slice(0, 1) == "#" ){         //TYPE
        this.$.debug( "TYPE FILTER INIT: " + query_match[n], this.$.DEBUG_LEVEL.LOG );

        var res_nodes = [];
        var match_val = query_match[n].slice(1,query_match[n].length).toUpperCase();
        for( var x=0;x<filtered_nodes.length;x++ ){
          if( filtered_nodes[x].type == match_val ){
            res_nodes.push( filtered_nodes[x] );
          }
        }

        filtered_nodes = res_nodes;
      }else if( query_match[n].slice(0, 1) == "[" ){   //ATTRIBUTES
        var split_attrs = query_match[n].toUpperCase().slice( 1, query_match[n].length-1 ).split(",");
        for( var t=0;t<split_attrs.length;t++ ){
          var res_nodes = [];

          var split_attrs = split_attrs[t].split( ":" );
          if( split_attrs.length==1 ){
            //It simply just must have this attribute.
            //res_nodes.push( filtered_nodes[0] );

          }else{
            //You must compare values of the attribute -- currently only supports string, but should also use float/int comparisons and logic.


          }

          //filtered_nodes = res_nodes;
        }
      }else if( query_match[n].slice(0, 1) == "(" ){   //OPTIONS
        //SELECTED, ECT.

        var split_options = query_match[n].toUpperCase().slice( 1, query_match[n].length-1 ).split(",");

        for( var t=0;t<split_options.length;t++ ){
          var res_nodes = [];

          //THE OPTION FOR SELECTED NODES ONLY, COMPARE IT AGAINST THE LIST.
          if( split_options[t] == "SELECTED" ){
            this.$.debug( "TYPE FILTER SELECTION ONLY", this.$.DEBUG_LEVEL.LOG );

            //GET THE SELECTION LIST.
            var sel_list = {};
            for( var p=0;p<selection.numberOfNodesSelected();p++ ){
              sel_list[ selection.selectedNode(p) ] = true;
              this.$.debug( selection.selectedNode(p), this.$.DEBUG_LEVEL.LOG );
            }

            for( var x=0;x<filtered_nodes.length;x++ ){
              if( sel_list[ filtered_nodes[x].path ] ){
                res_nodes.push( filtered_nodes[x] );
              }
            }
          }

          //--- NOTSELECTED DESELECTED !SELECTED  NOT SELECTED
          //THE OPTION FOR SELECTED NODES ONLY, COMPARE IT AGAINST THE LIST.
          else if( split_options[t] == "NOT SELECTED" || split_options[t] == "NOTSELECTED" || split_options[t] == "DESELECTED" || split_options[t] == "!SELECTED" ){
            this.$.debug( "TYPE FILTER SELECTION ONLY", this.$.DEBUG_LEVEL.LOG );

            //GET THE SELECTION LIST.
            var sel_list = {};
            for( var p=0;p<selection.numberOfNodesSelected();p++ ){
              sel_list[ selection.selectedNode(p) ] = true;
            }

            for( var x=0;x<filtered_nodes.length;x++ ){
              if( !sel_list[ filtered_nodes[x].path ] ){
                res_nodes.push( filtered_nodes[x] );
              }
            }
          }

          filtered_nodes = res_nodes;
        }
      }
    }

    nodes_returned = filtered_nodes;
  }

  if( sort_result ){
    var _timeline = this.getTimeline();
    nodes_returned = nodes_returned.sort(function(a, b){return a.timelineIndex(_timeline)-b.timelineIndex(_timeline)})
  }
  return nodes_returned;
}


/**
 * Adds a node to the scene.
 * @Deprecated         use AddNode directly in the destination group by calling it on the oGroupNode
 * @param   {string}   type            The type-name of the node to add.
 * @param   {string}   name            The name of the newly created node.
 * @param   {string}   group           The groupname to add the node.
 * @param   {$.oPoint} nodePosition    The position for the node to be placed in the network.
 *
 * @return {$.oNode}   The created node
 */
$.oScene.prototype.addNode = function( type, name, group, nodePosition ){
  var _group = (group instanceof this.$.oGroupNode)?group:this.$node(group);

  if (_group != null && _group instanceof this.$.oGroupNode){
    this.$.log("oScene.addNode is deprecated. Use oGroupNode.addNode instead")
    var _node = _group.addNode(type, name, nodePosition)
    return _node;
  }else{
    if (group == undefined) throw new Error ("Group path not specified for adding node. Use oGroupNode.addNode() instead.")
    throw new Error (group+" is an invalid group to add the Node to.")
  }
}


/**
 * Adds a column to the scene.
 * @param   {string}   type                           The type of the column.
 * @param   {string}   name                           The name of the column.
 * @param   {$.oElement}   oElementObject             For Drawing column, the element that will be represented by the column.
 *
 * @return {$.oColumn}  The created column
 */

$.oScene.prototype.addColumn = function( type, name, oElementObject ){
    // Defaults for optional parameters
    if( !type ){ return; }

    if (typeof name === 'undefined'){
      if( column.generateAnonymousName ){
        var name = column.generateAnonymousName();
      }else{
        var name = "ATV"+(new Date()).getTime();
      }
    }

    var _increment = 1;
    var _columnName = name;

    // increment name if a column with that name already exists
    while (column.type(_columnName) != ""){
        _columnName = name+"_"+_increment;
        _increment++;
    }

    this.$.debug( "CREATING THE COLUMN: " + name, this.$.DEBUG_LEVEL.LOG );
    System.println( "CREATING COLUMN: "+type );
    column.add(_columnName, type);

    var _column = new this.$.oColumn( _columnName );

    if (type == "DRAWING" && typeof oElementObject !== 'undefined'){
        oElementObject.column = this;// TODO: fix: this doesn't seem to actually work for some reason?
        this.$.debug( "set element "+oElementObject.id+" to column "+_column.uniqueName, this.$.DEBUG_LEVEL.LOG );
        column.setElementIdOfDrawing(_column.uniqueName, oElementObject.id);
    }

    //column.update();
    return _column;
}


/**
 * Adds an element to the scene.
 * @param   {string}     name                    The name of the element
 * @param   {string}     [imageFormat="TVG"]     The image format in capital letters (ex: "TVG", "PNG"...)
 * @param   {int}        [fieldGuide=12]         The field guide .
 * @param   {string}     [scanType="COLOR"]      can have the values "COLOR", "GRAY_SCALE" or "BW".
 *
 * @return {$.oElement}  The created element
 */
$.oScene.prototype.addElement = function(name, imageFormat, fieldGuide, scanType){
    // Defaults for optional parameters
    if (typeof scanType === 'undefined') var scanType = "COLOR";
    if (typeof fieldGuide === 'undefined') var fieldGuide = 12;
    if (typeof imageFormat === 'undefined') var imageFormat = "TVG";

    var _fileFormat = (imageFormat == "TVG")?"SCAN":imageFormat;
    var _vectorFormat = (imageFormat == "TVG")?imageFormat:"None";

    name = name.split(" ").join("_");

    var _id = element.add(name, scanType, fieldGuide, _fileFormat, _vectorFormat);
    var _element = new this.$.oElement( _id )

    return _element;
}


/**
 * Adds a drawing layer to the scene, with a drawing column and element linked. Possible to specify the column and element to use.
 * @Deprecated Use oGroupNode.addDrawingNode instead
 * @param   {string}     name            The name of the newly created node.
 * @param   {string}     group           The group in which the node is added.
 * @param   {$.oPoint}   nodePosition    The position for the node to be placed in the network.
 * @param   {$.object}   element         The element to attach to the column.
 * @param   {object}     drawingColumn   The column to attach to the drawing module.
 * @param   {object}     options         The creation options, nothing available at this point.

 * @return {$.oNode}     The created node, or bool as false.
 */
$.oScene.prototype.addDrawingNode = function( name, group, nodePosition, oElementObject, drawingColumn, options ){
  var _group = (group instanceof this.$.oGroupNode)?group:this.$node(group);

  if (_group != null && _group instanceof this.$.oGroupNode){
    this.$.log("oScene.addDrawingNode is deprecated. Use oGroupNode.addDrawingNode instead")
    var _node = _group.addNode(name, nodePosition, oElementObject, drawingColumn, options )
    return _node;
  }else{
    throw new Error (group+" is an invalid group to add the Drawing Node to.")
  }
}


/**
 * Adds a group to the scene.
 * @Deprecated Use oGroupNode.addGroup instead
 * @param   {string}     name                   The name of the newly created group.
 * @param   {string}     includeNodes           The nodes to add to the group.
 * @param   {$.oPoint}   addComposite           Whether to add a composite.
 * @param   {bool}       addPeg                 Whether to add a peg.
 * @param   {string}     group                  The group in which the node is added.
 * @param   $.{oPoint}   nodePosition           The position for the node to be placed in the network.

 * @return {$.oGroupNode}   The created node, or bool as false.
 */
$.oScene.prototype.addGroup = function( name, includeNodes, addComposite, addPeg, group, nodePosition ){
  var _group = (group instanceof this.$.oGroupNode)?group:this.$node(group);

  if (_group != null && _group instanceof this.$.oGroupNode){
    this.$.log("oScene.addGroup is deprecated. Use oGroupNode.addGroup instead")
    var _node = _group.addGroup(name, includeNodes, addComposite, addPeg, nodePosition )
    return _node;
  }else{
    throw new Error (group+" is an invalid group to add the Group Node to.")
  }
}



/**
 * Grabs the timeline object for a specific display.
 * @param   {string}        [display]                The display node to build the timeline for.
 * @return {$.oTimeline}    The timelne object given the display.
 */
$.oScene.prototype.getTimeline = function(display){
    if (typeof display === 'undefined') var display = '';
    return new this.$.oTimeline( display, this );
}


/**
 * Gets a palette by the name.
 * @param   {string}   name            The palette name to query and find.
 *
 * @return  {$.oPalette}                 The oPalette found given the query.
 */
$.oScene.prototype.getPaletteByName = function(name){
    var _paletteList = PaletteObjectManager.getScenePaletteList();
    for (var i=0; i<_paletteList.numPalettes; i++){
        var _palette = _paletteList.getPaletteByIndex(i);
        if (_palette.getName() == name) return new this.$.oPalette(_palette, _paletteList);
    }
    return null;
}


/**
 * Grabs the selected palette.
 * @return {$.oPalette}   oPalette with provided name.
 */
$.oScene.prototype.getSelectedPalette = function(){
    var _paletteList = PaletteManager.getScenePaletteList();
    var _id = PaletteManager.getCurrentPaletteId()
    var _palette = new this.$.oPalette(_paletteList.getPaletteById(_id), _paletteList);
    return _palette;
}


/**
 * Add a palette object to the specified location.
 * @param   {string}         name                          The name for the palette.
 * @param   {string}         index                         Index at which to insert the palette.
 * @param   {string}         paletteStorage                Storage type: environment, job, scene, element, external.
 * @param   {$.oElement}     storeInElement                The name of the palette to return, if available.
 *
 * @return {$.oPalette}   newly created oPalette with provided name.
 */
$.oScene.prototype.addPalette = function(name, insertAtIndex, paletteStorage, storeInElement){
  if (typeof paletteStorage === 'undefined') var paletteStorage = "scene";
  if (typeof insertAtIndex === 'undefined') var insertAtIndex = 0;

  var _list = PaletteObjectManager.getScenePaletteList();

  if (typeof storeInElement === 'undefined'){
    if (paletteStorage == "external") throw new Error("Element parameter should point to storage path if palette destination is External")
    if (paletteStorage == "element") throw new Error("Element parameter cannot be omitted if palette destination is Element")
    var _element = 1;
  }

  var _destination = $.oPalette.location[paletteStorage]
  if (paletteStorage == "element") var _element = storeInElement.id;


  /*switch (paletteStorage) {
    case "environnement" :
      _destination = PaletteObjectManager.Constants.Location.ENVIRONMENT;
      break;
    case "job" :
      _destination = PaletteObjectManager.Constants.Location.JOB;
      break;
    case "scene" :
      _destination = PaletteObjectManager.Constants.Location.SCENE;
      break;
    case "element" :
      _destination = PaletteObjectManager.Constants.Location.ELEMENT;
      var _element = storeInElement.id;
      break;
    case "external" :
      _destination = PaletteObjectManager.Constants.Location.EXTERNAL;
      break;
    default :
      break;
  }*/

  if (paletteStorage == "external"){
    var _palette = new this.$.oPalette(_list.createPalette(storeInElement+"/"+name, insertAtIndex), _list);
  }

  var _palette = new this.$.oPalette(_list.createPaletteAtLocation(_destination, storeInElement, name, insertAtIndex), _list);

  return _palette;
}



/**
 * Imports a palette into the specified location.
 * @param   {string}         path                          The palette file to import.
 * @param   {string}         name                          The name for the palette.
 * @param   {string}         index                         Index at which to insert the palette.
 * @param   {string}         paletteStorage                Storage type: environment, job, scene, element, external.
 * @param   {$.oElement}     storeInElement                The name of the palette to return, if available.
 *
 * @return {$.oPalette}   oPalette with provided name.
 */
$.oScene.prototype.importPalette = function(filename, name, index, paletteStorage, storeInElement){
  this.$.log("importPalette");
  var _list = PaletteObjectManager.getScenePaletteList();
  this.$.log("_list acquired");
  if  (typeof index === 'undefined') var index = _list.numPalettes;
  if  (typeof paletteStorage === 'undefined') var paletteStorage = "scene";

  if (typeof storeInElement === 'undefined'){
    if (paletteStorage == "external") throw new Error("Element parameter should point to storage path if palette destination is External")
    if (paletteStorage == "element") throw new Error("Element parameter cannot be omitted if palette destination is Element")
    var _element = 1;
  }

  var _paletteFile = new this.$.oFile(filename);

  if (!_paletteFile.exists){
    this.$.debug("Error: cannot import palette from file "+filename+" because it doesn't exist", this.$.DEBUG_LEVEL.ERROR);
    return null;
  }

  // create a dummy palette to get the destination path
  var _newPalette = this.addPalette("dummy_palette", index, paletteStorage, storeInElement);
  var _path = _newPalette.path;
  var _list = _newPalette._paletteList;
  this.$.log (_path);

  var _file = new this.$.oFile(_path);

  var paletteFolder = _file.folder;
  if (!paletteFolder.exists) paletteFolder.create();

  var _copy = _paletteFile.copy(paletteFolder.path, _paletteFile.name, true);

  this.$.log("copy: "+_copy);

  // load new palette
  _newPalette.remove(true);
  var _palette = _list.insertPalette(_copy.path.replace(".plt",""), index);
  this.$.log(_palette.getPath());

  _newPalette = new this.$.oPalette(_palette, _list);
  //_newPalette.name = _paletteFile.name;

  return _newPalette;
}


/**
 * Returns all the links existing between an ensemble of nodes.
 * @param   {$.oNode[]}    nodes               The nodes to look at.
 * @param   {string}       [paletteName]       A custom name for the created palette.
 * @param   {string}       [colorName]         A custom name to give to the gathered colors.
 *
 * @return       {$.oLink[]}      An array of unique links existing between the nodes.
 */
$.oScene.prototype.createPaletteFromNodes = function(nodes, paletteName, colorName){
  if (typeof paletteName === 'undefined') var paletteName = this.name;
  if (typeof colorName ==='undefined') var colorName = false;

  // get unique Color Ids
  var _usedColorIds = [];
  for (var i in nodes){
    var _ids = nodes[i].usedColorIds;
    for (var j in _ids){
      if (_usedColorIds.indexOf(_ids[j])) _usedColorIds.push(_ids[j]);
    }
  }

  // find used Palettes and Colors
  // find RGB values
  var _palettes = this.palettes;
  var _usedColors = new Array(_usedColorIds.length);
  var _usedPalettes = [];

  //var _paletteList = _palette._paletteList;

  for (var i in _usedColorIds){
    for (var j in _palettes){
      var _color = _palettes[j].getColorById(_usedColorIds[i]);
      // color found
      if (_color != null){
        if (_usedPalettes.indexOf(_palettes[j]) == -1) _usedPalettes.push(_palettes[j]);
        _usedColors[i] = _color;
        break;
      }
    }
  }

  // create single palette
  var _newPalette = this.addPalette(paletteName);
  _newPalette.colors[0].remove();

  for (var i=0; i<_usedColors.length; i++){
    var _colorCopy = _usedColors[i].copyToPalette(_newPalette);
    if (colorName) _colorCopy.name = colorName+" "+(i+1);
  }

  return _newPalette;
}


/**
 * Returns all the links existing between an ensemble of nodes.
 * @param   {$.oNode[]}      nodes                         The nodes to look at.
 *
 * @return  {$.oLink[]}      An array of unique links existing between the nodes.
 */
$.oScene.prototype.getNodesLinks = function (nodes){
  var _links = [];
  var _linkStrings = [];
  // var _nodePaths = nodes.map(function(x){return x.path});
  var _nodePaths = {};

  for (var i in nodes){
    _nodePaths[nodes[i].path] = nodes[i];
  }

  for (var i in nodes){
    var _inLinks = nodes[i].getInLinks();
    var _outLinks = nodes[i].getOutLinks();

    // add link only once and replace the node object for one from the passed arguments
    for (var j in _inLinks){
      var _link = _inLinks[j];
      var _path = _link.outNode.path;
      if (_nodePaths.hasOwnProperty(_path) && _linkStrings.indexOf(_link.toString()) == -1){
        _link.inNode = nodes[i];
        _link.outNode = _nodePaths[_path];
        _links.push(_link);
        _linkStrings.push(_link.toString());
      }
    }

    // add link only once and replace the inNode object for one from the passed arguments
    for (var j in _outLinks){
      var _link = _outLinks[j];
      var _path = _link.inNode.path;
      if (_nodePaths.hasOwnProperty(_link.inNode.path) && _linkStrings.indexOf(_link.toString()) == -1){
        _link.outNode = nodes[i];
        _link.inNode = _nodePaths[_link.inNode.path];
        _links.push(_link);
        _linkStrings.push(_link.toString());
      }
    }
  }

  return _links;
}


/**
 * Merges Drawing nodes into a single node.
 * @param   {$.oNode[]}      nodes                         The Drawing nodes to merge.
 * @param   {string}         resultName                    The Node name for the resulting node of the merged content.
 * @param   {bool}           deleteMerged                  Whether the original nodes be deleted.
 *
 * @return {$.oNode}        The resulting drawing node from the merge.
 */
$.oScene.prototype.mergeNodes = function (nodes, resultName, deleteMerged){
    // TODO: is there a way to do this without Action.perform?
    // pass a oNode object as argument for destination node instead of name/group?

    if (typeof resultName === 'undefined') var resultName = nodes[0].name+"_merged"
    if (typeof group === 'undefined') var group = nodes[0].group;
    if (typeof deleteMerged === 'undefined') var deleteMerged = true;

    // only merge READ nodes so we filter out other nodes from parameters
    nodes = nodes.filter(function(x){return x.type == "READ"})

    var _timeline = this.getTimeline()
    nodes = nodes.sort(function(a, b){return a.timelineIndex(_timeline) - b.timelineIndex(_timeline)})

    // create a new destination node for the merged result
    var _mergedNode = this.addDrawingNode(resultName);

    // connect the node to the scene base composite, TODO: handle better placement
    // also TODO: check that the composite is connected to the display currently active
    // also TODO: disable pegs that affect the nodes but that we don't want to merge
    var _composite = this.nodes.filter(function(x){return x.type == "COMPOSITE"})[0]

    _mergedNode.linkOutNode(_composite);

    // get  the individual keys of all nodes
    var _keys = []
    for (var i in nodes){
        var _timings = nodes[i].timings;
        var _frameNumbers = _keys.map(function (x){return x.frameNumber})
        for (var j in _timings){
            if (_frameNumbers.indexOf(_timings[j].frameNumber) == -1) _keys.push(_timings[j])
        }
    }


    // sort frame objects by frameNumber
    _keys = _keys.sort(function(a, b){return a.frameNumber - b.frameNumber})

    // create an empty drawing for each exposure of the nodes to be merged
    for (var i in _keys){
        var _frame = _keys[i].frameNumber
        _mergedNode.element.addDrawing(_frame)

        // copy paste the content of each of the nodes onto the mergedNode
        // code inspired by Bake_Parent_to_Drawings v1.2 from Yu Ueda (raindropmoment.com)
        frame.setCurrent( _frame );

        Action.perform("onActionChooseSelectTool()", "cameraView");
        for (var j=nodes.length-1; j>=0; j--){
            //if (nodes[j].attributes.drawing.element.frames[_frame].isBlank) continue;

            DrawingTools.setCurrentDrawingFromNodeName( nodes[j].path, _frame );
            Action.perform("selectAll()", "cameraView");

            // select all and check. If empty, operation ends for the current frame
            if (Action.validate("copy()", "cameraView").enabled){
                Action.perform("copy()", "cameraView");
                DrawingTools.setCurrentDrawingFromNodeName( _mergedNode.path, _frame );
                Action.perform("paste()", "cameraView");
            }
        }
    }

    _mergedNode.attributes.drawing.element.column.extendExposures();
    _mergedNode.placeAtCenter(nodes)

    // connect to the same composite as the first node, at the same place
    // delete nodes that were merged if parameter is specified
    if (deleteMerged){
        for (var i in nodes){
            nodes[i].remove();
        }
    }
    return _mergedNode;
}


/**
 * export a template from the specified nodes.
 * @param   {$.oNodes[]}       nodes                                          The path of the TPL file to import.
 * @param   {bool}             [exportPath]                                   Whether to extend the exposures of the content imported.
 * @param   {string}           [exportPalettesMode]                           can have the values : "usedOnly", "all", "createPalette"
 * @param   {string}           [renameUsedColors]                             if creating a palette, optionally set here the name for the colors (they will have a number added to each)
 * @param   {copyOptions}      [copyOptions]                                  An object containing paste options as per Harmony's standard paste options.
 *
 * @return {bool}         The success of the export.
 * @todo turn exportPalettesMode into an enum?
 * @example
 * // how to export a clean palette with no extra drawings and everything renamed by frame, and only the necessary colors gathered in one palette:
 *
 * $.beginUndo();
 *
 * var doc = $.scn;
 * var nodes = doc.getSelectedNodes();
 *
 * for (var i in nodes){
 *   if (nodes[i].type != "READ") continue;
 *
 *   var myColumn = nodes[i].element.column;      // we grab the column directly from the element of the node
 *   myColumn.removeUnexposedDrawings();          // remove extra unused drawings
 *   myColumn.renameAllByFrame();                 // rename all drawings by frame
 * }
 *
 * doc.exportTemplate(nodes, "C:/templateExample.tpl", "createPalette"); // "createPalette" value will create one palette for all colors
 *
 * $.endUndo();
 */
$.oScene.prototype.exportTemplate = function(nodes, exportPath, exportPalettesMode, renameUsedColors, copyOptions){
  if (typeof exportPalettesMode === 'undefined') var exportPalettesMode = "usedOnly";
  if (typeof copyOptions === 'undefined') var copyOptions = copyPaste.getCurrentCreateOptions();
  if (typeof renameUsedColors === 'undefined') var renameUsedColors = false;

  if (!Array.isArray(nodes)) nodes = [nodes];

  // add nodes included in groups as they'll get automatically exported
  var _allNodes = nodes;
  for (var i in nodes){
    if (nodes[i].type == "GROUP") _allNodes = _allNodes.concat(nodes[i].subNodes(true));
  }

  var _readNodes = _allNodes.filter(function (x){return x.type == "READ";});

  var _templateFolder = new this.$.oFolder(exportPath);
  while (_templateFolder.exists) _templateFolder = new this.$.oFolder(_templateFolder.path.replace(".tpl", "_1.tpl"));

  var _name = _templateFolder.name.replace(".tpl", "");
  var _folder = _templateFolder.folder.path;

  // create the palette with only the colors contained in the layers
  if (_readNodes.length > 0 ){
    if (exportPalettesMode == "usedOnly"){
      var _usedPalettes = [];
      var _usedPalettePaths = [];
      for (var i in _allNodes){
        var _palettes = _allNodes[i].getUsedPalettes();
        for (var j in _palettes){
          if (_usedPalettePaths.indexOf(_palettes[j].path) != -1){
            _usedPalettes.push(_palettes[j]);
            _usedPalettePaths.push(_palettes[j].path);
          }
        }
      }
    }

    if (exportPalettesMode == "createPalette"){
      var templatePalette = this.createPaletteFromNodes(_allNodes, _name, renameUsedColors);
      _usedPalettes = [templatePalette];
    }
  }

  this.$.debug(" exporting template "+_name+" to folder: "+_folder, this.$.DEBUG_LEVEL.LOG)

  selection.clearSelection();
  selection.addNodesToSelection (_allNodes.map(function(x){return x.path}));
  var success = copyPaste.createTemplateFromSelection (_name, _folder);
  if (!success) return false;

  if (_readNodes.length > 0 && exportPalettesMode != "all"){

    this.$.debug("export of template "+_name+" finished, cleaning palettes", this.$.DEBUG_LEVEL.LOG);

    // deleting the extra palettes from the exported template
    var _paletteFolder = new this.$.oFolder(_templateFolder.path+"/palette-library");
    var _paletteFiles = _paletteFolder.getFiles();
    var _paletteNames = _usedPalettes.map(function(x){return x.name});

    for (var i in _paletteFiles){
      var _paletteName = _paletteFiles[i].name;
      if (_paletteNames.indexOf(_paletteName) == -1) _paletteFiles[i].remove();
    }

    // building the template palette list
    var _listFile = ["ToonBoomAnimationInc PaletteList 1"];
    var _errors = [];

    if (exportPalettesMode == "createPalette"){
      _listFile.push("palette-library/"+_name+' LINK "'+_paletteFolder+"/"+_name+'.plt"');
    }else if (exportPalettesMode == "usedOnly"){
      for (var i in _usedPalettes){
        _listFile.push("palette-library/"+_usedPalettes[i].name+' LINK "'+_paletteFolder+"/"+_usedPalettes[i].name+'.plt"');
      }
    }

    var _paletteListFile = new this.$.oFile(_templateFolder.path+"/PALETTE_LIST");
    _paletteListFile.write(_listFile.join("\n"));
  }

  // remove the palette created for the template
  if (exportPalettesMode == "createPalette"){
    var _paletteFile = _paletteFolder.getFiles()[0];
    _paletteFile.rename(_name)
    templatePalette.remove(true);
  }

  selection.clearSelection();
  return true;
}


/**
 * Imports the specified template into the scene.
 * @deprecated
 * @param   {string}           tplPath                                        The path of the TPL file to import.
 * @param   {string}           [group]                                        The path of the existing target group to which the TPL is imported.
 * @param   {$.oNode[]}        [destinationNodes]                             The nodes affected by the template.
 * @param   {bool}             [extendScene]                                  Whether to extend the exposures of the content imported.
 * @param   {$.oPoint}         [nodePosition]                                 The position to offset imported new nodes.
 * @param   {object}           [pasteOptions]                                 An object containing paste options as per Harmony's standard paste options.
 *
 * @return {$.oNode[]}         The resulting pasted nodes.
 */
$.oScene.prototype.importTemplate = function( tplPath, group, destinationNodes, extendScene, nodePosition, pasteOptions ){
  if (typeof group === 'undefined') var group = this.root;
  var _group = (group instanceof this.$.oGroupNode)?group:this.$node(group);

  if (_group != null && _group instanceof this.$.oGroupNode){
    this.$.log("oScene.importTemplate is deprecated. Use oGroupNode.importTemplate instead")
    var _node = _group.addNode(tplPath, destinationNodes, extendScene, nodePosition, pasteOptions )
    return _nodes;
  }else{
    throw new Error (group+" is an invalid group to import the template into.")
  }
}


/**
 * Imports a PSD to the scene.
 * @Deprecated use oGroupNode.importPSD instead
 * @param   {string}         path                          The palette file to import.
 * @param   {string}         [group]                       The path of the existing group to import the PSD into.
 * @param   {$.oPoint}       [nodePosition]                The position for the node to be placed in the network.
 * @param   {bool}           [separateLayers]              Separate the layers of the PSD.
 * @param   {bool}           [addPeg]                      Whether to add a peg.
 * @param   {bool}           [addComposite]                Whether to add a composite.
 * @param   {string}         [alignment]                   Alignment type.
 *
 * @return {$.oNode[]}     The nodes being created as part of the PSD import.
 */
$.oScene.prototype.importPSD = function( path, group, nodePosition, separateLayers, addPeg, addComposite, alignment ){
  if (typeof group === 'undefined') var group = this.root;
  var _group = (group instanceof this.$.oGroupNode)?group:this.$node(group);

  if (_group != null && _group instanceof this.$.oGroupNode){
    this.$.log("oScene.importPSD is deprecated. Use oGroupNode.importPSD instead")
    var _node = _group.importPSD(path, separateLayers, addPeg, addComposite, alignment, nodePosition)
    return _node;
  }else{
    throw new Error (group+" is an invalid group to import a PSD file to.")
  }
}


/**
 * Updates a previously imported PSD by matching layer names.
 * @deprecated
 * @param   {string}       path                          The PSD file to update.
 * @param   {bool}         [separateLayers]              Whether the PSD was imported as separate layers.
 */
$.oScene.prototype.updatePSD = function( path, group, separateLayers ){
  if (typeof group === 'undefined') var group = this.root;
  var _group = (group instanceof this.$.oGroupNode)?group:this.$node(group);

  if (_group != null && _group instanceof this.$.oGroupNode){
    this.$.log("oScene.updatePSD is deprecated. Use oGroupNode.updatePSD instead")
    var _node = _group.updatePSD(path, separateLayers)
    return _node;
  }else{
    throw new Error (group+" is an invalid group to update a PSD file in.")
  }
}


/**
 * Imports a sound into the scene
 * @param   {string}         path                          The sound file to import.
 * @param   {string}         layerName                     The name to give the layer created.
 *
 * @return {$.oNode}        The imported Quicktime Node.
 */
 $.oScene.prototype.importSound = function(path, layerName){
   var _audioFile = new this.$.oFile(path);
   if (typeof layerName === 'undefined') var layerName = _audioFile.name;

   // creating an audio column for the sound
    var _soundColumn = this.addColumn("SOUND", layerName);
    column.importSound( _soundColumn.name, 1, path);

    return _soundColumn;
 }


 /**
 * Exports a QT of the scene
 * @param   {string}         path                          The path to export the quicktime file to.
 * @param   {string}         display                       The name of the display to use to export.
 * @param   {double}         scale                         The scale of the export compared to the scene resolution.
 * @param   {bool}           exportSound                   Whether to include the sound in the export.
 * @param   {bool}           exportPreviewArea             Whether to only export the preview area of the timeline.
 *
 * @return {$.oNode}        The imported Quicktime Node.
 */
$.oScene.prototype.exportQT = function( path, display, scale, exportSound, exportPreviewArea){
  if (typeof display === 'undefined') var display = node.getName(node.getNodes(["DISPLAY"])[0]);
  if (typeof exportSound === 'undefined') var exportSound = true;
  if (typeof exportPreviewArea === 'undefined') var exportPreviewArea = false;
  if (typeof scale === 'undefined') var scale = 1;

  if (display instanceof oNode) display = display.name;

  var _startFrame = exportPreviewArea?scene.getStartFrame():1;
  var _stopFrame = exportPreviewArea?scene.getStopFrame():this.length-1;
  var _resX = this.defaultResolutionX*scale
  var _resY= this.defaultResolutionY*scale
  return exporter.exportToQuicktime ("", _startFrame, _stopFrame, exportSound, _resX, _resY, path, display, true, 1);
}


/**
 * Imports a QT into the scene
 * @Deprecated
 * @param   {string}         path                          The quicktime file to import.
 * @param   {string}         group                         The group to import the QT into.
 * @param   {$.oPoint}       nodePosition                  The position for the node to be placed in the network.
 * @param   {bool}           extendScene                   Whether to extend the scene to the duration of the QT.
 * @param   {string}         alignment                     Alignment type.
 *
 * @return {$.oNode}        The imported Quicktime Node.
 */
$.oScene.prototype.importQT = function( path, group, importSound, nodePosition, extendScene, alignment ){
  if (typeof group === 'undefined') var group = this.root;
  var _group = (group instanceof this.$.oGroupNode)?group:this.$node(group);

  if (_group != null && _group instanceof this.$.oGroupNode){
    this.$.log("oScene.importQT is deprecated. Use oGroupNode.importQTs instead")
    var _node = _group.importQT(path, importSound, extendScene, alignment, nodePosition)
    return _node;
  }else{
    throw new Error (group+" is an invalid group to import a QT file to.")
  }
}


/**
 * Adds a backdrop to a group in a specific position.
 * @Deprecated
 * @param   {string}           groupPath                         The group in which this backdrop is created.
 * @param   {string}           title                             The title of the backdrop.
 * @param   {string}           body                              The body text of the backdrop.
 * @param   {$.oColorValue}    color                             The oColorValue of the node.
 * @param   {float}            x                                 The X position of the backdrop, an offset value if nodes are specified.
 * @param   {float}            y                                 The Y position of the backdrop, an offset value if nodes are specified.
 * @param   {float}            width                             The Width of the backdrop, a padding value if nodes are specified.
 * @param   {float}            height                            The Height of the backdrop, a padding value if nodes are specified.
 *
 * @return {$.oBackdrop}       The created backdrop.
 */
$.oScene.prototype.addBackdrop = function( groupPath, title, body, color, x, y, width, height ){
  if (typeof group === 'undefined') var group = this.root;
  var _group = (group instanceof this.$.oGroupNode)?group:this.$node(group);

  if (_group != null && _group instanceof this.$.oGroupNode){
    this.$.log("oScene.addBackdrop is deprecated. Use oGroupNode.addBackdrop instead")
    var _backdrop = _group.addBackdrop(title, body, color, x, y, width, height)
    return _backdrop;
  }else{
    throw new Error (groupPath+" is an invalid group to add the BackDrop to.")
  }
};


/**
 * Adds a backdrop to a group around specified nodes
 * @Deprecated
 * @param   {string}           groupPath                         The group in which this backdrop is created.
 * @param   {$.oNode[]}        nodes                             The nodes that the backdrop encompasses.
 * @param   {string}           title                             The title of the backdrop.
 * @param   {string}           body                              The body text of the backdrop.
 * @param   {$.oColorValue}    color                             The oColorValue of the node.
 * @param   {float}            x                                 The X position of the backdrop, an offset value if nodes are specified.
 * @param   {float}            y                                 The Y position of the backdrop, an offset value if nodes are specified.
 * @param   {float}            width                             The Width of the backdrop, a padding value if nodes are specified.
 * @param   {float}            height                            The Height of the backdrop, a padding value if nodes are specified.
 *
 * @return {$.oBackdrop}       The created backdrop.
 */
$.oScene.prototype.addBackdropToNodes = function( groupPath, nodes, title, body, color, x, y, width, height ){
  if (typeof group === 'undefined') var group = this.root;
  var _group = (group instanceof this.$.oGroupNode)?group:this.$node(group);

  if (_group != null && _group instanceof this.$.oGroupNode) {
    this.$.log("oScene.addBackdropToNodes is deprecated. Use oGroupNode.addBackdropToNodes instead")
    var _backdrop = _group.addBackdropToNodes(nodes, title, body, color, x, y, width, height)
    return _backdrop;
  }else{
    throw new Error (groupPath+" is an invalid group to add the BackDrop to.")
  }
};




//SAVING FUNCTIONS--
//-- TODO:  saveAs, saveAsNewVersion

/**
 * Saves the scene.
 */
$.oScene.prototype.save = function( ){
  scene.saveAll();

}

/**
 * Closes the scene.
 * @param   {bool}            [exit]                                       Whether it should exit after closing.
 */
$.oScene.prototype.close = function( exit ){
  if (typeof nodePosition === 'undefined') exit = false;

  if( exit ){
    scene.closeSceneAndExit();
  }else{
    scene.closeScene();
  }
}

/**
 * Gets the current camera matrix.
 *
 * @return {Matrix4x4}          The matrix of the camera.
 */
$.oScene.prototype.getCameraMatrix = function( ){
    return scene.getCameraMatrix();
}

/**
 * Gets the current projection matrix.
 *
 * @return {Matrix4x4}          The projection matrix of the camera/scene.
 */
$.oScene.prototype.getProjectionMatrix = function( ){
  var fov = this.fov;
  var f   = scene.toOGL( new Point3d( 0.0, 0.0, this.unitsZ ) ).z;
  var n   = 0.00001;

  //Standard pprojection matrix derivation.
  var S = 1.0 / Math.tan( ( fov/2.0 ) * ( $.pi/180.0 ) );
  var projectionMatrix = [  S,          0.0,                  0.0,     0.0,
                            0.0,          S,                  0.0,     0.0,
                            0.0,        0.0,       -1.0*(f/(f-n)),    -1.0,
                            0.0,        0.0,   -1.0*((f*n)/(f-n)),     0.0
                         ];

  var newMatrix = new Matrix4x4();
  for( var r=0;r<4;r++ ){
    for( var c=0;c<4;c++ ){
      newMatrix["m"+r+""+c] = projectionMatrix[ (c*4.0)+r ];
    }
  }
  return newMatrix;
}


/**
 * Gets the current scene's metadata.
 *
 * @see $.oMetadata
 * @return {$.oMetadata}          The metadata of the scene.
 */
$.oScene.prototype.getMetadata = function( ){
  return new this.$.oMetadata( );
}


// Short Notations

/**
 * Gets a node by the path.
 * @param   {string}   fullPath         The path of the node in question.
 *
 * @return  {$.oNode}                     The node found given the query.
 */
$.oScene.prototype.$node = function( fullPath ){
    return this.getNodeByPath( fullPath );
}

/**
 * Gets a column by the name.
 * @param  {string}             uniqueName               The unique name of the column as a string.
 * @param  {$.oAttribute}       oAttributeObject         The oAttribute object the column is linked to.
 *
 * @return {$.oColumn}          The node found given the query.
 */
$.oScene.prototype.$column = function( uniqueName, oAttributeObject ){
    return this.getColumnByName( uniqueName, oAttributeObject );
}


/**
 * Gets a palette by its name.
 * @param   {string}   name            The name of the palette.
 *
 * @return  {$.oPalette}               The node found given the query.
 */
$.oScene.prototype.$palette = function( name ){
    return this.getPaletteByName( name );
}
