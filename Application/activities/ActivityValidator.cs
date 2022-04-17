using Domain;
using FluentValidation;

namespace Application.activities
{
    public class ActivityValidator : AbstractValidator<Activity>
    {
         public ActivityValidator()
         {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Time).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
            RuleFor(x => x.City).NotEmpty();
            RuleFor(x => x.Venue).NotEmpty();
        }
    }
}