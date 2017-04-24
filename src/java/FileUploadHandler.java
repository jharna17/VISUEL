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

import java.io.IOException;

import java.util.List;

import javax.servlet.ServletException;

import javax.servlet.http.HttpServlet;

import javax.servlet.http.HttpServletRequest;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;

import org.apache.commons.fileupload.disk.DiskFileItemFactory;

import org.apache.commons.fileupload.servlet.ServletFileUpload;


public class FileUploadHandler extends HttpServlet {

    private final String UPLOAD_DIRECTORY = "C:\\Users\\Jharna\\Downloads\\Visuel\\uploads\\";

    @Override

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
           String name = null;
	        //process only if its multipart content
        if (ServletFileUpload.isMultipartContent(request)) {

            try {

                List<FileItem> multiparts = new ServletFileUpload(
                        new DiskFileItemFactory()).parseRequest(request);
                      
                for (FileItem item : multiparts) {

                    if (!item.isFormField()) {

                        name = new File(item.getName()).getName();    
                        item.write(new File(UPLOAD_DIRECTORY + File.separator + name));
                        
                        
                        if(name.charAt(name.length()-1)=='s')
                {
           
                  File inputFile = new File("C:\\Users\\Jharna\\Downloads\\Visuel\\uploads\\"+name);  
                  File outputFile = new File("C:\\Users\\Jharna\\Downloads\\Visuel\\uploads\\abc.csv");  
                  xlsxtocsv.convertToXls(inputFile,outputFile);  
                }
                else if(name.charAt(name.length()-1)=='x')
                {
                  File inputFile = new File("C:\\Users\\Jharna\\Downloads\\Visuel\\uploads\\"+name);  
                  File outputFile = new File("C:\\Users\\Jharna\\Downloads\\Visuel\\uploads\\abc.csv");  
                  xlsxtocsv.convertToXlsx(inputFile,outputFile);  
                }
                else
                {
                    File oldfile =new File("C:\\Users\\Jharna\\Downloads\\Visuel\\uploads\\"+name);
                    File newfile =new File("C:\\Users\\Jharna\\Downloads\\Visuel\\uploads\\abc.csv");
                        if(newfile.exists())
                        {   int i=1;
                            while(newfile.exists())
                            {                                
                              File new1= new File("C:\\Users\\Jharna\\Downloads\\Visuel\\uploads\\abc"+i+".csv");
                              newfile.renameTo(new1);
                              i++;
                            }
                            File newfile1 =new File("C:\\Users\\Jharna\\Downloads\\Visuel\\uploads\\abc.csv");
                            oldfile.renameTo(newfile1);
                        }
                        else if(oldfile.renameTo(newfile)){
                		System.out.println("Rename succesful");
                        }else
                        {
                                System.out.println("Rename failed");
                             }
                }
                }
                
                
                }
                
	               //File uploaded successfully
                request.setAttribute("message", "File Uploaded Successfully");

            } catch (Exception ex) {

                request.setAttribute("message", "File Upload Failed due to " + ex);
            }

        } else {

            request.setAttribute("message","Sorry this Servlet only handles file upload request");

        }

        request.getRequestDispatcher("result.jsp").forward(request, response);

    }

}
