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
//          $.oFolder class         //
//                                  //
//                                  //
//////////////////////////////////////
//////////////////////////////////////


/**
 * The $.oFolder helper class -- providing utilities for folder manipulation and access.
 * @constructor
 * @classdesc  $.oFolder Base Class
 * @param       {string}              path                      The path to the folder.
 *
 * @property    {string}             path                      The path to the folder.
 */
$.oFolder = function(path){
    this._type = "folder";
    this._path = fileMapper.toNativePath(path).split("\\").join("/");
    // if (this.path.slice(-1) == "/") this.path += this.path.slice(0, -1);

}


/**
 * The path of the folder.
 * @name $.oFolder#path
 * @type {string}
 */
Object.defineProperty($.oFolder.prototype, 'path', {
    get: function(){
        return this._path;
    },
    set: function( newPath ){
      if( !this.exists ){
        this._path = fileMapper.toNativePath( newPath ).split("\\").join("/");
        return;
      }

      var folder = new this.$.oFolder( newPath );
      if( folder.exists ){
        throw "Target path already exists. No default replace.";
      }

      var parent_folder = folder.folder;
      if( !parent_folder.exists ){
        throw "Target path's parent folder must already exist.";
      }

      this.move( newPath, false );
    }
});


/**
 * The name of the folder.
 * @name $.oFolder#name
 * @type {string}
 */
Object.defineProperty($.oFolder.prototype, 'name', {
    get: function(){
        var _name = this.path.split("/");
        _name = _name.pop();
        return _name;
    }
});


/**
 * The parent folder.
 * @name $.oFolder#folder
 * @type {$.oFolder}
 */
Object.defineProperty($.oFolder.prototype, 'folder', {
    get: function(){
        var _folder = this.path.slice(0,this.path.lastIndexOf("/", this.path.length-2));
        return new this.$.oFolder(_folder);
    }
});


/**
 * The parent folder.
 * @name $.oFolder#exists
 * @type {string}
 */
Object.defineProperty($.oFolder.prototype, 'exists', {
    get: function(){
        var dir = new Dir;
        dir.path = this.path
        return dir.exists;
    }
});


/**
 * The files in the folder.
 * @name $.oFolder#files
 * @type {$.oFile[]}
 * @deprecated use oFolder.getFiles() instead to specify filter
 */
Object.defineProperty($.oFolder.prototype, 'files', {
    get: function(){
      var dir = new QDir;
      dir.setPath(this.path);
      dir.setFilter( QDir.Files );

      if (!dir.exists) throw new Error("can't get files from folder "+this.path+" because it doesn't exist");

      return dir.entryList().map(function(x){return new this.$.oFile(dir.path()+"/"+x)});
    }
});


/**
 * The folders within this folder.
 * @name $.oFolder#folders
 * @type {$.oFile[]}
 * @deprecated oFolder.folder is the containing parent folder, it can't also mean the children folders
 */
Object.defineProperty($.oFolder.prototype, 'folders', {
    get: function(){
      var _dir = new QDir;
      _dir.setPath(this.path);
      if (!_dir.exists) throw new Error("can't get files from folder "+this.path+" because it doesn't exist");
      _dir.setFilter(QDir.Dirs);
      var _folders = _dir.entryList();

      for (var i = _folders.length-1; i>=0; i--){
          if (_folders[i] == "." || _folders[i] == "..") _folders.splice(i,1);
      }

      return _folders.map(function(x){return new this.$.oFolder( dir.path() + "/" + x )});
    }
});


/**
 * The content within the folder -- both folders and files.
 * @name $.oFolder#content
 * @type {$.oFile/$.oFolder[] }
 */
Object.defineProperty($.oFolder.prototype, 'content', {
    get: function(){
      var content = this.files;
          content = content.concat( this.folders );
      return content;
    }
});


/**
 * Lists the file names contained inside the folder.
 * @param   {string}   [filter]               Filter wildcards for the content of the folder.
 *
 * @return: { string[] }                      The file content of folder.
 */
$.oFolder.prototype.listFiles = function(filter){
    if (typeof filter === 'undefined') var filter = "*";

    var _dir = new QDir;
    _dir.setPath(this.path);
    if (!_dir.exists) throw new Error("can't get files from folder "+this.path+" because it doesn't exist");
    _dir.setNameFilters([filter]);
    _dir.setFilter( QDir.Files);
    var _files = _dir.entryList();

    return _files;
}


/**
 * get the files from the folder
 * @param   {string}   [filter]                Filter wildcards for the content of the folder.
 *
 * @return: { $.oFile[] }                      The file content of the folder.
 */
$.oFolder.prototype.getFiles = function( filter ){
    if (typeof filter === 'undefined') var filter = "*";
    // returns the list of $.oFile in a directory that match a filter

    var _path = this.path;

    var _files = [];
    var _file_list = this.listFiles(filter);
    for( var i in _file_list){
      _files.push( new this.$.oFile( _path+'/'+_file_list[i] ) );
    }

    return _files;
}


/**
 * lists the folder names contained inside the folder.
 * @param   {string}   [filter]               Filter wildcards for the content of the folder.
 *
 * @return: { string[] }                      The file content of folder.
 */
$.oFolder.prototype.listFolders = function(filter){

    if (typeof filter === 'undefined') var filter = "*";

    var _dir = new QDir;
    _dir.setPath(this.path);

    if (!_dir.exists){
      this.$.debug("can't get files from folder "+this.path+" because it doesn't exist", this.$.DEBUG_LEVEL.ERROR);
      return [];
    }

    _dir.setNameFilters([filter]);
    _dir.setFilter(QDir.Dirs); //QDir.NoDotAndDotDot not supported?
    var _folders = _dir.entryList();

    for (var i in _folders){
        if (_folders[i] == "." || _folders[i] == "..") _folders.splice(i,1);
    }

    return _folders;
}


/**
 * gets the folders inside the oFolder
 * @param   {string}   [filter]              Filter wildcards for the content of the folder.
 *
 * @return: { $.oFolder[] }                  The folder contents of the folder.
 */
$.oFolder.prototype.getFolders = function( filter ){
    if (typeof filter === 'undefined') var filter = "*";
    // returns the list of $.oFile in a directory that match a filter

    var _path = this.path;

    var _folders = [];
    var _folders_list = this.listFolders(filter);
    for( var i in _folders_list){
      _folders.push( new this.$.oFolder(_path+'/'+_folders_list[i]));
    }

    return _folders;
}


 /**
 * Creates the folder, if it doesn't already exist.
 *
 * @return: { bool }                         The existence of the newly created folder.
 */
$.oFolder.prototype.create = function(){
    if( this.exists ){
      this.$.debug("folder "+this.path+" already exists and will not be created", this.$.DEBUG_LEVEL.WARNING)
      return true;
    }

    var dir = new Dir;
    dir.path = this.path;
    dir.mkdirs();
    return dir.exists;
}


/**
 * Copy the folder and its contents to another path. WIP
 * @param   {string}   [folderPath]          The path to the folder location to copy to (CFNote: Should this not be a $.oFolder?)
 * @param   {string}   [copyName]            The name of the folder to copy (CFNote: Should this be avoided and the folderPath be the full path?)
 * @param   {bool}     [overwrite]           Whether to overwrite the target.
 */
$.oFolder.prototype.copy = function( folderPath, copyName, overwrite ){
    if (typeof overwrite === 'undefined') var overwrite = false;
    if (typeof copyName === 'undefined') var copyName = this.name;
    if (typeof folderPath === 'undefined') var folderPath = this.folder.path;

    if (this.name == copyName && folderPath == this.folder.path) copyName += "_copy";

    var copyPath = folderPath+copyName;

    // TODO: deep recursive copy file by file of the contents

}


/**
 * Move this folder to the specified path.
 * @param   {string}   destFolderPath           The new complete path of the folder after the move (CFNote: Should this not be a $.oFolder?)
 * @param   {bool}     [overwrite=false]        Whether to overwrite the target.
 *
 * @return: { bool }                            The result of the move.
 */
$.oFolder.prototype.move = function( destFolderPath, overwrite ){
    if (typeof overwrite === 'undefined') var overwrite = false;

    if (destFolderPath instanceof this.$.oFolder) destFolderPath = destFolderPath.path;

    var _folder = destFolder.folder;
    var _name = destFolder.name;

    var dir = new Dir;
    dir.path = destFolderPath;

    if (dir.exists && !overwrite)
        throw new Error("destination file "+dir.path+" exists and will not be overwritten. Can't move folder.");

    var path = fileMapper.toNativePath(this.path);
    var destPath = fileMapper.toNativePath(dir.path+"/");

    var destDir = new Dir;
    try {
        destDir.rename( path, destPath );
        this._path = destPath;

        return true;
    }catch (err){
        throw new Error ("Couldn't move folder "+this.path+" to new address "+destPath);
        return false;
    }
}


/**
 * Move this folder to a different parent folder, while retaining its content and base name.
 * @param   {string}   destFolderPath           The path of the destination to copy the folder into.
 * @param   {bool}     [overwrite=false]        Whether to overwrite the target. Default is false.
 *
 * @return: { bool }                            The result of the move.
 */
$.oFolder.prototype.moveToFolder = function( destFolderPath, overwrite ){
  destFolderPath = (destFolderPath instanceof this.$.oFolder)?destFolderPath:new this.$.oFolder(destFolderPath)

  var folder = destFolderPath.path;
  var name = this.name;

  destFolderPath.move(folder+"/"+name, overwrite);
}


/**
 * Get the sub folder or file by name.
 * @param   {string}   name                     The sub name of a folder or file within a directory.
 * @return: {$.oFolder/$.oFile}                 The resulting oFile or oFolder.
 */
$.oFolder.prototype.get = function( destName ){
  var new_path = this.path + "/" + destName;
  var new_folder = new $.oFolder( new_path );
  if( new_folder.exists ){
    return new_folder;
  }

  var new_file = new $.oFile( new_path );
  if( new_file.exists ){
    return new_file;
  }

  return false;
}


 /**
 * Used in converting the folder to a string value, provides the string-path.
 * @return  {string}   The folder path's as a string.
 */
$.oFolder.prototype.toString = function(){
    return this.path;
}


//////////////////////////////////////
//////////////////////////////////////
//                                  //
//                                  //
//           $.oFile class          //
//                                  //
//                                  //
//////////////////////////////////////
//////////////////////////////////////


/**
 * The $.oFile helper class -- providing utilities for file manipulation and access.
 * @constructor
 * @classdesc  $.oFile Base Class
 * @param      {string}              path                     The path to the file.
 *
 * @property    {string}             path                     The path to the file.
 */
$.oFile = function(path){
    this._type = "file";
    this._path = fileMapper.toNativePath(path).split('\\').join('/');
}


/**
 * The name of the file with extension.
 * @name $.oFile#fullName
 * @type {string}
 */
Object.defineProperty($.oFile.prototype, 'fullName', {
    get: function(){
        var _name = this.path.slice( this.path.lastIndexOf("/")+1 );
        return _name;
    }
});


/**
 * The name of the file without extenstion.
 * @name $.oFile#name
 * @type {string}
 */
Object.defineProperty($.oFile.prototype, 'name', {
    get: function(){
      var _fullName = this.fullName;
      if (_fullName.indexOf(".") == -1) return _fullName;

      var _name = _fullName.slice(0, _fullName.lastIndexOf("."));
      return _name;
    }
});


/**
 * The extension of the file.
 * @name $.oFile#extension
 * @type {string}
 */
Object.defineProperty($.oFile.prototype, 'extension', {
    get: function(){
      var _fullName = this.fullName;
      if (_fullName.indexOf(".") == -1) return "";

      var _extension = _fullName.slice(_fullName.lastIndexOf(".")+1);
      return _extension;
    }
});


/**
 * The folder containing the file.
 * @name $.oFile#folder
 * @type {$.oFolder}
 */
Object.defineProperty($.oFile.prototype, 'folder', {
    get: function(){
        var _folder = this.path.slice(0,this.path.lastIndexOf("/"));
        return new this.$.oFolder(_folder);
    }
});


/**
 * Whether the file exists already.
 * @name $.oFile#exists
 * @type {bool}
 */
Object.defineProperty($.oFile.prototype, 'exists', {
    get: function(){
        var _file = new File( this.path );
        return _file.exists;
    }
})


//Todo, Size, Date Created, Date Modified


/**
 * Reads the content of the file.
 *
 * @return: { string }                      The contents of the file.
 */
$.oFile.prototype.read = function() {
    var file = new File(this.path);

    try {
        if (file.exists) {
            file.open(FileAccess.ReadOnly);
            var string = file.read();
            file.close();
            return string;
        }
    } catch (err) {
        return null
    }
}


/**
 * Writes to the file.
 * @param   {string}   content               Content to write to the file.
 * @param   {bool}     [append=false]        Whether to append to the file.
 */
$.oFile.prototype.write = function(content, append){
    if (typeof append === 'undefined') var append = false

    var file = new File(this.path);
    try {
        if (append){
            file.open(FileAccess.Append);
        }else{
            file.open(FileAccess.WriteOnly);
        }
        file.write(content);
        file.close();
        return true
    } catch (err) {return false;}
}


/**
 * Moves the file to the specified path.
 * @param   {string}   folder                  destination folder for the file.
 * @param   {bool}     [overwrite=false]       Whether to overwrite the file.
 *
 * @return: { bool }                           The result of the move.
 */
$.oFile.prototype.move = function( newPath, overwrite ){
    if (typeof overwrite === 'undefined') var overwrite = false;

    if(newPath instanceof this.$.oFile) newPath = newPath.path;

    var _file = new PermanentFile(this.path);
    var _dest = new PermanentFile(newPath);
    // this.$.alert("moving "+_file.path()+" to "+_dest.path()+" exists?"+_dest.exists())

    if (_dest.exists() && !overwrite){
        this.$.debug("destination file "+newPath+" exists and will not be overwritten. Can't move file.", this.$.DEBUG_LEVEL.ERROR);
        return false;
    }

    var success = _file.move(_dest);
    // this.$.alert(success)
    if (success) return new this.$.oFile(_dest.path)
    return false;
}


 /**
 * Moves the file to the folder.
 * @param   {string}   folder                  destination folder for the file.
 * @param   {bool}     [overwrite=false]       Whether to overwrite the file.
 *
 * @return: { bool }                           The result of the move.
 */
$.oFile.prototype.moveToFolder = function( folder, overwrite ){
  if (folder instanceof this.$.oFolder) folder = folder.path;
  var _fileName = this.fullName;

  return this.move(folder+"/"+_fileName, overwrite)
}


 /**
 * Renames the file.
 * @param   {string}   newName                 the new name for the file, without the extension.
 * @param   {bool}     [overwrite=false]       Whether to replace a file of the same name if it exists in the folder.
 *
 * @return: { bool }                           The result of the renaming.
 */
$.oFile.prototype.rename = function( newName, overwrite){
  if (newName == this.name) return true;
  if (this.extension != "") newName += "."+this.extension;
  return this.move(this.folder.path+"/"+newName, overwrite);
}



/**
 * Copies the file to the folder.
 * @param   {string}   [folder]                Content to write to the file.
 * @param   {string}   [copyName]              Name of the copied file. If not specified, the copy will keep its name unless another file is present in which case it will be called "_copy"
 * @param   {bool}     [overwrite=false]       Whether to overwrite the file.
 *
 * @return: { bool }                           The result of the copy.
 */
$.oFile.prototype.copy = function( destfolder, copyName, overwrite){
    if (typeof overwrite === 'undefined') var overwrite = false;
    if (typeof copyName === 'undefined') var copyName = this.name;
    if (typeof destfolder === 'undefined') var destfolder = this.folder.path;

    var _fileName = this.fullName;
    if(destfolder instanceof this.$.oFolder) destfolder = destfolder.path;

    // remove extension from name in case user added it to the param
    copyName.replace ("."+this.extension, "");
    if (this.name == copyName && destfolder == this.folder.path) copyName += "_copy";

    var _fileName = copyName+((this.extension.length>0)?"."+this.extension:"");

    var _file = new PermanentFile(this.path);
    var _dest = new PermanentFile(destfolder+"/"+_fileName);

    if (_dest.exists() && !overwrite){
        this.$.debug("Destination file "+destfolder+"/"+_fileName+" exists and will not be overwritten. Can't copy file.", this.DEBUG_LEVEL.ERROR);
        return false;
    }

    this.$.debug("copying "+_file.path()+" to "+_dest.path(), this.$.DEBUG_LEVEL.LOG)

    try{
      var success = _file.copy(_dest);
    }catch(err){
      this.$.debug("Couldn't copy "+_file.path()+" to "+_dest.path()+", ", this.$.DEBUG_LEVEL.ERROR)
    }

    // this.$.log(overwrite+" "+success)
    if (success) return new this.$.oFile(_dest.path())

    return false;
}


/**
 * Removes the file.
 * @return: { bool }                           The result of the removal.
 */
$.oFile.prototype.remove = function(){
    var _file = new PermanentFile(this.path)
    if (_file.exists()) return _file.remove()
}


 /**
 * Used in converting the file to a string value, provides the string-path.
 * @return  {string}   The file path's as a string.
 */
$.oFile.prototype.toString = function(){
    return this.path;
}


/**
 * The path of the file.
 * @name $.oFile#path
 * @type {string}
 */
Object.defineProperty( $.oFile.prototype, 'path', {
    get: function(){
        return this._path;
    },

    set: function( newPath ){
        if( !this.exists ){
          this._path = fileMapper.toNativePath( newPath ).split("\\").join("/");
          return;
        }

        var file = new this.$.oFile( newPath );
        if( file.exists ){
          throw "Target path already exists. No default replace.";
        }

        var parent_folder = file.folder;
        if( !parent_folder.exists ){
          throw "Target path's parent folder must already exist.";
        }

        this.move( newPath, false );
    }
});
