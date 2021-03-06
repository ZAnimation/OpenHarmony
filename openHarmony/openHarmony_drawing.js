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
//          $.oDrawing class        //
//                                  //
//                                  //
//////////////////////////////////////
//////////////////////////////////////


/**
 * The base class for the $.oDrawing.
 * @constructor
 * @classdesc  $.oDrawing Base Class
 * @param   {int}                    name                       The name of the drawing.
 * @param   {$.oElement}             oElementObject             The element object associated to the element.
 *
 * @property {int}                   name                       The name of the drawing.
 * @property {$.oElement}            element                    The element object associated to the element.
 */
$.oDrawing = function( name, oElementObject ){
  this._type = "drawing";

  this._name = name;
  this.element = oElementObject;
}


/**
 * The name of the drawing.
 * @name $.oDrawing#name
 * @type {string}
 */
Object.defineProperty( $.oDrawing.prototype, 'name', {
    get : function(){
       return this._name;
    },
    
    set : function(newName){
      if (this._name == newName) return;

      var _column = this.element.column.uniqueName;
      // this ripples recursively

      if (Drawing.isExists(this.element.id, newName)) this.element.getDrawingByName(newName).name = newName+"_1";
      column.renameDrawing(_column, this._name, newName);
      this._name = newName;
    }
})



/**
 * The folder path of the drawing on the filesystem.
 * @name $.oDrawing#path
 * @type {string}
 */
Object.defineProperty( $.oDrawing.prototype, 'path', {
    get : function(){
        return fileMapper.toNativePath(Drawing.filename(this.element.id, this.name))
    }
})


// $.oDrawing Class methods


/**
 * Converts the Drawing object to a string of the drawing name.
 * @name $.oDrawing#remove
 * @type {string}
 */
$.oDrawing.prototype.remove = function(){
    var _element = this.element;
    var _column = _element.column;
    
    var _frames = _column.frames;
    
    var _lastFrame = _frames.pop();
    // this.$.log(_lastFrame.frameNumber+": "+_lastFrame.value)

    var _thisDrawing = this;
    
    // we have to expose the drawing on the column to delete it. Exposing at the last frame...
    this.$.debug("deleting drawing "+_thisDrawing+" from element "+_element.name, this.$.DEBUG_LEVEL.LOG)
    var _lastDrawing = _lastFrame.value;
    var _keyFrame = _lastFrame.isKeyFrame;
    _lastFrame.value = _thisDrawing;
    
    column.deleteDrawingAt(_column.uniqueName, _lastFrame.frameNumber);
    
    // resetting the last frame
    _lastFrame.value = _lastDrawing;
    _lastFrame.isKeyFrame = _keyFrame;
}



/**
 * Converts the Drawing object to a string of the drawing name.
 * @name $.oDrawing#toString
 * @type {string}
 */
$.oDrawing.prototype.toString = function(){
    return this.name;
}
