/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Aatish Bansal
 */
import java.io.File;

public class Rename
{
    public static void main(String[] args)
    {

		File oldfile =new File("C:\\Users\\Aatish Bansal\\Desktop\\test.xlsx");
		File newfile =new File("C:\\Users\\Aatish Bansal\\Desktop\\abc.xlsx");

		if(oldfile.renameTo(newfile)){
			System.out.println("Rename succesful");
		}else{
			System.out.println("Rename failed");
		}

    }
}