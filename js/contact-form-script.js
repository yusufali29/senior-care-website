(function ($) {
	"use strict";

	$("#contact_form").validate({
		submitHandler: function (form) {
			var formBtn = $(form).find("button[type=\"submit\"]");
			var formResultDiv = "#form-result";
			var formBtnOldMsg = formBtn.html();

			$(formResultDiv).remove();
			formBtn.before("<div id=\"form-result\" class=\"alert alert-success\" role=\"alert\" style=\"display: none;\"></div>");
			formBtn.prop("disabled", true).html(formBtn.data("loading-text") || formBtnOldMsg);

			$(form).ajaxSubmit({
				dataType: "json",
				success: function (data) {
					if (data.status === "true") {
						$(form).find(".form-control").val("");
					}
					formBtn.prop("disabled", false).html(formBtnOldMsg);
					$(formResultDiv).html(data.message).fadeIn("slow");
					setTimeout(function () {
						$(formResultDiv).fadeOut("slow");
					}, 6000);
				},
				error: function () {
					formBtn.prop("disabled", false).html(formBtnOldMsg);
					$(formResultDiv).html("Your message could not be sent. Please try again later.").fadeIn("slow");
				}
			});
		}
	});

})(jQuery);
