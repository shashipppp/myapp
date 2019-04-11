export class patternValidator {

    public static PATTERNS = {
        username: '[a-z0-9_-]{6,15}',
        password1: '(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20}',
        password: '[a-z0-9_-]{6,15}',
        mobile: '[0-9]{9,10}',
        email: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}'
    }
}