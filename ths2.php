<!DOCTYPE html>
<html lang="bg">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Благодарим ви! Вашата поръчка е приета!</title>
    <link rel="stylesheet" href="ths.css" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  </head>



  <body>
    <div class="left">
      <div class="header">
        <div class="title">
          <span class="main-title">
		  Благодарим ви!
		  </span><br />
          Вашата поръчка <br>е приета!
        </div>
        <span>
		Очаквайте скоро наш консултант да Ви се обади за потвърждаване.
        </span>
      </div>

      <div class="form">
        <p>Моля, проверете правилността на въведините данни.</p>
        <div class="form-wrap">
          <div class="wrap-input">
            <div class="input">
              <label for="name">Име</label>
              <div><?php echo ($data["name"])?></div>
            </div>
            <div class="input">
              <label for="name">Телефон</label>
              <div><?php echo ($data["phone"])?></div>
            </div>
          </div>
          <button type="button" onclick="{showForm()}" id="hideButton">
            Променете данните
          </button>

          <form
            class="hidden-form" id="form" method="post"
             geo="bg" action="api.php" 
	onsubmit="return validate_form(this, 'Моля, въведете коректен номер телефона');"
			>
			
            <input type="text" name="name" required="" placeholder="Име" />

            <input type="tel" name="phone" required="" placeholder="Телефон" id="phone"/>

            <button type="submit">Променете данните</button>

<input name="subid" type="hidden" value="<?php echo $data['data1']; ?>" />
<input name="px" type="hidden" value="<?php echo $data['px']; ?>" />
<input name="bayer" type="hidden" value="<?php echo $data['data2']; ?>" />
          </form>
        </div>
      </div>
    </div>
	

  <script>
    const showForm = () => {
      var showForm = document.getElementById("form");
      var hideButton = document.getElementById("hideButton");
      showForm.classList.add("showMeBaby");
      hideButton.classList.add("hideButton");
    };
  </script>


<script src="jquery.maskedinput.min.js"></script>
    <script>
        $(function()
        {
            $('#phone').on('change',function () {
                var phone = $(this).val();
                phone = phone.replace('0','');

                while(phone.charAt(0) === '0')
                {
                    phone = phone.substr(1);
                }

                $(this).val(phone);
            });
            
            $.mask.definitions['9'] = '';
            $.mask.definitions['d'] = '[0-9]';

            var theLanguage = $('html').attr('lang');

            if(theLanguage == 'ru')
            {
                $("input[type=tel]").mask("+7 (ddd) ddd-dd-dd");
            } else if (theLanguage == 'ua')
            {
                $("input[type=tel]").mask("+38-ddd-ddd-dd-dd");
            } else if (theLanguage == 'by')
            {
                $("input[type=tel]").mask("+375 ddd-ddd-ddd");
            } else if (theLanguage == 'kz')
            {
                $("input[type=tel]").mask("+7 ddd ddd dddd");
            } else if (theLanguage == 'kg')
            {
                $("input[type=tel]").mask("+ddd ddd dd-dd-dd");
            } else if (theLanguage == 'md')
            {
                $("input[type=tel]").mask("0 ddd ddddd");
            } else if (theLanguage == 'az')
            {
                $("input[type=tel]").mask("+ddd-dd-ddd-dd-dd");
            } else if (theLanguage == 'ge')
            {
                $("input[type=tel]").mask("+995 ddd dd-dd-dd");
            } else if (theLanguage == 'es')
            {
                $("input[type=tel]").mask("+34 ddd dd dd dd");
            } else if (theLanguage == 'pe')
            {
                $("input[type=tel]").mask("+51 ddd ddd ddd");
            } else if (theLanguage == 'cl')
            {
                $("input[type=tel]").mask("+56 d dddd dddd");
            } else if (theLanguage == 'ar')
            {
                $("input[type=tel]").mask("+54 dd dddd dddd");
            } else if (theLanguage == 'co')
            {
                $("input[type=tel]").mask("+57 ddd ddd dddd");
            } else if (theLanguage == 'mx')
            {
                $("input[type=tel]").mask("+52 dd dddd dddd");
            } else if (theLanguage == 'it')
            {
                $("input[type=tel]").mask("+39 ddd-ddd-dddd");
            } else if (theLanguage == 'esp')
            {
                $("input[type=tel]").mask("+34 ddd dd dd dd");
            } else if (theLanguage == 'pt')
            {
                $("input[type=tel]").mask("+351 ddd ddd ddd");
            } else if (theLanguage == 'prt')
            {
                $("input[type=tel]").mask("+351 ddd ddd ddd");
            } else if (theLanguage == 'id')
            {
                $("input[type=tel]").mask("+62 ddd ddd ddd");
            } else if (theLanguage == 'gr')
            {
                $("input[type=tel]").mask("+30 ddd ddddddd");
            } else if (theLanguage == 'cy')
            {
                $("input[type=tel]").mask("+357 dd dddddd");
            } else if (theLanguage == 'ro')
            {
                $("input[type=tel]").mask("+40 ddd ddd dd dd");
            } else if (theLanguage == 'bg')
            {
                $("input[type=tel]").mask("dddd dd ddd d?d");
            } else if (theLanguage == 'cz')
            {
                $("input[type=tel]").mask("+420 ddd ddd ddd");
            } else if (theLanguage == 'sk')
            {
                $("input[type=tel]").mask("+421 ddd ddd ddd");
            } else if (theLanguage == 'si')
            {
                $("input[type=tel]").mask("+386 d ddd dd dd");
            } else if (theLanguage == 'pl')
            {
                $("input[type=tel]").mask("+48 ddd ddd ddd");
            } else if (theLanguage == 'al')
            {
                $("input[type=tel]").mask("+355 dd ddd dddd");
            } else if (theLanguage == 'rs')
            {
                $("input[type=tel]").mask("+381 dd ddddd-dd");
            } else if (theLanguage == 'ph')
            {
                $("input[type=tel]").mask("+63 d dddd dd-dd");
            } else if (theLanguage == 'hu')
            {
                $("input[type=tel]").mask("+36 d ddd dddd");
            } else if (theLanguage == 'hr')
            {
                $("input[type=tel]").mask("+385 d dddd dd-dd");
            } else if (theLanguage == 'ba')
            {
                $("input[type=tel]").mask("+387 dd dddddd");
            }
        });

    </script>
	
  </body>

</html>
