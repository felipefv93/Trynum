import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase,FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../services/auth.service';
import 'firebase/storage';


declare var $:any;
interface FileReaderEventTarget extends EventTarget {
    result:string
}
interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage():string;
}
@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styles: []
})
export class InicialComponent implements OnInit , OnChanges, AfterViewInit{
  imagen:any;
  desing:boolean = true;
  code:boolean = true;
  develop:boolean = true;
  datosUsuario:any = {
    nombre:"Felipe",
    apellidos:"Fierro Villalobos",
    email:this.servicio.usuario.email,
    nombreUsuario:"felipefv93",
    nombreMostrar:"Felipe Fierro",
    opciones:{
      vendedor:false,
      proveedor:true
    },
    direccion:{
      calle:"Margarita",
      numero:"106",
      ciudad:"Delicias",
      estado:"Chih.",
      pais:""
    }
  }

  constructor(private firebaseApp:FirebaseApp,private servicio:AuthService,private db:AngularFireDatabase){}
  prueba(event){
    console.log(event);
  }
  guardar() {
    this.datosUsuario.opciones.vendedor= $('#vendedor')[0].checked;
    this.datosUsuario.opciones.proveedor= $('#proveedor')[0].checked;
    console.log($('#design'));
    console.log(this.datosUsuario);
    let storageRef = this.firebaseApp.storage().ref();
    let path = "/img/perfil/"+this.servicio.usuario.uid; //+ this.imagen.name;
    var iRef = storageRef.child(path);
    iRef.getDownloadURL().then(success=>{
      // console.log(success);
    })
    // iRef.put(this.imagen).then((success) => {
    //   console.log(success);
    // })
  }
  readURL(input) {
    var archivos = input.srcElement.files;
    console.log(input.srcElement.files);
    if (archivos && archivos[0]) {
        var reader = new FileReader();

        reader.onload = function (e:FileReaderEvent) {
            $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
        }
        reader.readAsDataURL(archivos[0]);
    }
    this.imagen = archivos[0];
}
ngOnInit(){
    // Code for the Validator
    var $validator = $('.wizard-card form').validate({
      rules: {
        firstname: {
          required: true,
          minlength: 3
        },
        lastname: {
          required: true,
          minlength: 3
        },
        username: {
          required: true,
          minlength: 3
        },
        email: {
          required: true,
          minlength: 3,
        }
        },

        errorPlacement: function(error, element) {
            $(element).parent('div').addClass('has-error');
         }
  });

    // Wizard Initialization
    $('.wizard-card').bootstrapWizard({
        'tabClass': 'nav nav-pills',
        'nextSelector': '.btn-next',
        'previousSelector': '.btn-previous',

        onNext: function(tab, navigation, index) {
          var $valid = $('.wizard-card form').valid();
          if(!$valid) {
            $validator.focusInvalid();
            return false;
          }
        },

        onInit : function(tab, navigation, index){

          //check number of tabs and fill the entire row
          var $total = navigation.find('li').length;
          var  $width = 100/$total;
          var $wizard = navigation.closest('.wizard-card');

          var $display_width = $(document).width();

          if($display_width < 600 && $total > 3){
              $width = 50;
          }

           navigation.find('li').css('width',$width + '%');
           var $first_li = navigation.find('li:first-child a').html();
           var $moving_div = $('<div class="moving-tab">' + $first_li + '</div>');
           $('.wizard-card .wizard-navigation').append($moving_div);

        //    this.refreshAnimation($wizard, index);
        var total_steps = $wizard.find('li').length;
        var move_distance = $wizard.width() / total_steps;
        var step_width = move_distance;
        move_distance *= index;

        var $current = index + 1;

        if($current == 1){
            move_distance -= 8;
        } else if($current == total_steps){
            move_distance += 8;
        }

        $wizard.find('.moving-tab').css('width', step_width);
        $('.moving-tab').css({
            'transform':'translate3d(' + move_distance + 'px, 0, 0)',
            'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

        });

           $('.moving-tab').css('transition','transform 0s');
       },

        onTabClick : function(tab, navigation, index){

            var $valid = $('.wizard-card form').valid();

            if(!$valid){
                return false;
            } else{
                return true;
            }
        },

        onTabShow: function(tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index+1;

            var $wizard = navigation.closest('.wizard-card');

            // If it's the last tab then hide the last button and show the finish instead
            if($current >= $total) {
                $($wizard).find('.btn-next').hide();
                $($wizard).find('.btn-finish').show();
            } else {
                $($wizard).find('.btn-next').show();
                $($wizard).find('.btn-finish').hide();
            }

            var button_text = navigation.find('li:nth-child(' + $current + ') a').html();

            setTimeout(function(){
                $('.moving-tab').text(button_text);
            }, 150);

            var checkbox = $('.footer-checkbox');

            if( index !== 0 ){
                $(checkbox).css({
                    'opacity':'0',
                    'visibility':'hidden',
                    'position':'absolute'
                });
            } else {
                $(checkbox).css({
                    'opacity':'1',
                    'visibility':'visible'
                });
            }

            // this.refreshAnimation($wizard, index);
            var total_steps = $wizard.find('li').length;
            var move_distance = $wizard.width() / total_steps;
            var step_width = move_distance;
            move_distance *= index;

            var $current = index + 1;

            if($current == 1){
                move_distance -= 8;
            } else if($current == total_steps){
                move_distance += 8;
            }

            $wizard.find('.moving-tab').css('width', step_width);
            $('.moving-tab').css({
                'transform':'translate3d(' + move_distance + 'px, 0, 0)',
                'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

            });
        }
    });


    // Prepare the preview for profile picture
    $("#wizard-picture").change(function(){
        // console.log(this.files);
      //   // this.readURL(this);
      //   if (this.files && this.files[0]) {
      //     var reader = new FileReader();
  
      //     reader.onload = function (e:FileReaderEvent) {
      //         $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
      //     }
      //     reader.readAsDataURL(this.files[0]);
      //     // this.imagen=this.files;
      //     // console.log(this.imagen);
      
      // }
      
      // for (let selectedFile of [(document.getElementById('file')).files[0]]) {
      
      // // let path = `/${this.folder}/${selectedFile.name}`;
      // // var iRef = storageRef.child(path);
      // console.log(path);
      // iRef.put(selectedFile).then((snapshot) => {
      // console.log('Uploaded a blob or file! Now storing the reference at', `/logos/${selectedFile.name}`);
      // //this.firebaseDB.list('/logos/').push({path:path,filename:selectedFile.name});
      // });
      // }
        
    });

    $('[data-toggle="wizard-radio"]').click(function(){
        console.log('click');

        var wizard = $(this).closest('.wizard-card');
        wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
        $(this).addClass('active');
        $(wizard).find('[type="radio"]').removeAttr('checked');
        $(this).find('[type="radio"]').attr('checked','true');
    });

    $('[data-toggle="wizard-checkbox"]').click(function(){
        console.log(this);
        if( $(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).find('[type="checkbox"]').removeAttr('checked');
        } else {
            $(this).addClass('active');
            $(this).find('[type="checkbox"]').attr('checked','true');
            
        }
    });

    $('.set-full-height').css('height', 'auto');

}

ngOnChanges(){
    var input = $(this);
    var target:EventTarget;
    if (input.files && input.files[0]) {
        var reader:any = new FileReader();

        reader.onload = function (e) {
            $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
        }
        reader.readAsDataURL(input.files[0]);
    }
}
ngAfterViewInit(){
    $('.wizard-card').each(function(){

        var $wizard = $(this);
        var index = $wizard.bootstrapWizard('currentIndex');
        // this.refreshAnimation($wizard, index);

        var total_steps = $wizard.find('li').length;
        var move_distance = $wizard.width() / total_steps;
        var step_width = move_distance;
        move_distance *= index;

        var $current = index + 1;

        if($current == 1){
            move_distance -= 8;
        } else if($current == total_steps){
            move_distance += 8;
        }

        $wizard.find('.moving-tab').css('width', step_width);
        $('.moving-tab').css({
            'transform':'translate3d(' + move_distance + 'px, 0, 0)',
            'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

        });

        $('.moving-tab').css({
            'transition': 'transform 0s'
        });
    });
}

}