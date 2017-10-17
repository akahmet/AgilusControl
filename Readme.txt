/*
16.10.2017 
Ahmet AK @ BAU Robotics Lab For GIBIRTech
Required Skills: Network Interfaces && TCP/IP && KRL && (NodeJs || Java)
Test at : Kuka Agilus r900 sixx & KRC 4
*/

Login Agilus: 
	Press Robot Button,
	Configuration -> User Group
		Username: Administrator
		Password: KUKA

Configure Network:
	Press Robot Button,
	Startup -> Network Configuration
		Click Advanced
		(VIRTUAL 5)
		IP = 172.31.1.147
		MASK = 255.255.255.0
		GATEWAY = 172.31.1.47
		check windows interface button
		
Start Program
	Press Robot Button,
	Startup -> Service -> Minimize HMI
	RUN KUKAVARPROXY.exe in Windows
	
Connect Lan Cable from X66 (KLI) interface to Your Computer
SET your Computer Lan interface with that configuration:
	IP = 172.31.1.148 (!!!)
	MASK = 255.255.255.0
	GATEWAY = EMPTY

After configuration you should be able to ping 172.31.1.147 from your computer, if not check connection and cable
	
NOT: IF YOU ARE DOING STEP FROM ZERO, YOU HAVE TO CONFIGURE $CONFIG.DAT WITH YOUR VARIABLE AND REMOTETEST CODE IN KUKA PAD AS MODULE PROGRAM

$CONFIG.DAT: (STEU/$CONFIG.DAT)
	DEFDAT $CONFIG
		FRAME MYPOS
		AXIS MYAXIS
	ENDDAT
	
RUN one of the remotetest(1-2-3) program in KUKA PAD as AUTO PROGRAM
	remotetest1 = CONTROL RELATIVE CARTESIAN
	remotetest2 = CONTROL AXIS BASED SYSTEM
	remotetest3 = CONTROL CARTESIAN BASED SYSTEM 

Finally, you can run NodeJs Wrapper or Java Client on your computer to access Agilus.

Thank you aauc-mechlab and Massimiliano Fago to create JOpenShowVar and KUKAVARPROXY:

http://sourceforge.net/projects/openshowvar/

https://github.com/aauc-mechlab/JOpenShowVar
