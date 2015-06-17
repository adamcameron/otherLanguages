package me.adamcameron.miscellany;

import java.io.File;

public class FileFilterOnMinimumLength implements java.io.FileFilter {

	private long length;

	public FileFilterOnMinimumLength(long length){
		this.length = length;
	}
	
	public boolean accept(File pathname){
		return pathname.length() >= this.length;
	}

}