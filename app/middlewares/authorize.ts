// import { Request, Response, NextFunction } from 'express';

// export const authorize =
//   (...allowedRoles: string[]) =>
//   (req: Request, res: Response, next: NextFunction) => {
//     const userRole = req.user?.role; // pastikan user disimpan di req.user dari JWT
//     if (!allowedRoles.includes(userRole)) {
//       return res.status(403).json({ message: 'Forbidden: Access is denied.' });
//     }
//     next();
//   };

// ...existing code...
import { Request, Response, NextFunction } from 'express';

// Extend Express Request interface to include 'user'
interface AuthenticatedRequest extends Request {
  user?: {
    role?: string;
    // add other user properties if needed
  };
}

export const authorize =
  (...allowedRoles: string[]) =>
  (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden: Access is denied.' });
    }
    next();
  };
// ...existing code...