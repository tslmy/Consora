
Consora API Documentation v0.1
==============================

Foreword
--------
This is the official documentation for developers to easily intergrate their stand-alone Javascript(jQuery included) applications to a open-source lightweight console UI system, Consora.  
Enjoy.

Glossary (Don't be frightened. Very short.)
--------
*   `Consora`: A open-source, jQuery-based, Webkit-oriented(mostly), lightweight, minimalistic console platform & UI system served in a web page.
*   `Consorapps`: Applications on Consora, which can be executed in the Consora console using a saperate command. For developers, these are Javascript functions that executed when user gives a command. Notice that it doesn't have to be all the functions you write!
*   `package`: A package is a Javascript file containing a set of Consorapps that are of the same category.  
               For example, a package may contain Consorapps that calculates `sin()`, `cos()` and `tan()`, while another provides JS-based games.
*   `Tslmy`: [Me](http://tslmy.tk), the author.

Context
--------
Don't be bored, this is easy. I just feel like writing a lot XD.

###What on earth is Consora?
I would like just refer to the _Glossary_.

###How can I acquire my own copy of Consora system?
To have a test drive and/or set up your own Consora, Just head to <https://github.com/tslmy/Consora> and grab a newest [ZIP][] pack.  
[ZIP]: https://github.com/tslmy/Consora/zipball/master
_P.S.If __ajax__ is required, you should upload the files to a server and then access the _index.htm_ in a URL way to enable ajax loading.

###I've prepared my code, how can I add it into my own Consora?
Two ways can lead your work to your user:
####Load-When-Asked Way
If you would like your user get a simple Consora platform first, and then load packages when user says `ins`(tall), you can just do these steps repeatedly to all your packages:

1.  In your JS file, rename all the Consorapps into something like:

        programs.push('AAAA');function program_AAAA(){
    , where `AAAA`(ALL LOWERCASE!!) is what you expect your user to execute for this function, like `AAAA para1 para2`.
2.  Put your JS file under `/program/` folder.
3.  Rename it like `pack_XXXX.js`, where `XXXX` is a short name you like. This file is called your _package_ from now on.
4.  Edit `/system.js`. At `program_packs=` line, add your own package's information to it (see the example below), so that your visitors could find your treasure.  
For example: if your package's short name is `XXXX`, and the commands you want your visitors to be able to execute are `AAAA`, `BBBB` and `CCCC`, you edit this line to:

        program_packs=[['info',',me,'],['XXXX',',AAAA,BBBB,CCCC,']];
  
####Initial Way
Some specific function is required by your user at most of the occasions, so it's better to make them available at the same time the console is loaded.

1.  Insert your prepared codes to `basic_program.js`.
2.  Rename the Consorapps as told in the previous way. 
  
###I got a idea/I just improved it a little, how can I contribute my effort to Consora project?
I am always glad to make friends, so do contact me!  
If you have ideas for __improving Consora__ main system itself, please use [GitHub](https://github.com/tslmy/Consora) and fork your own copy. You know how to play it.  
If you feel like chatting with me myself, there're several ways to get in touch with me:

*  Twitter: <https://twitter.com/tslmy>
*  E-mail:  <tslimingyang@126.com>
*  Home Page: <http://tslmy.tk>
*  QQ:  466548897
*  _I don't own a phone._
*  Yell to the sky: "__Tslmy__!!!"

Appendix
-------
Nothing here.

Tslmy, 2012.1.12.