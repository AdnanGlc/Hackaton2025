namespace backend.Services.EmailService
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string[] emails,string subject,string message);
    }
}
