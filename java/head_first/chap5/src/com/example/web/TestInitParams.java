package com.example.web;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.util.*;

public class TestInitParams extends HttpServlet {
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.println("Test Init Params<br />");
		
		Enumeration e = getServletConfig().getInitParameterNames();
		while (e.hasMoreElements()){
			out.println("<br/>param name = " + e.nextElement() + "<br />");
		}
		
		out.println("Main email is: " + getServletConfig().getInitParameter("mainEmail"));
		out.println("<br />");
		out.println("Admin email is: " + getServletConfig().getInitParameter("adminEmail"));
		out.println("<br />");
	}
}