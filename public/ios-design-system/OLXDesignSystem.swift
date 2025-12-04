import UIKit
import SwiftUI

// MARK: - OLX Color Palette
// Complete color system for iOS based on OLX brand guidelines

extension UIColor {
    
    // MARK: - Primary Colors
    static let olxDarkNavy = UIColor(red: 0/255, green: 47/255, blue: 52/255, alpha: 1)      // #002F34
    static let olxRoyalBlue = UIColor(red: 29/255, green: 60/255, blue: 129/255, alpha: 1)   // #1D3C81
    static let olxTurquoise = UIColor(red: 0/255, green: 164/255, blue: 159/255, alpha: 1)   // #00A49F
    
    // MARK: - Secondary Colors
    static let olxRoseRed = UIColor(red: 170/255, green: 19/255, blue: 61/255, alpha: 1)     // #AA133D
    static let olxWarmTan = UIColor(red: 210/255, green: 137/255, blue: 130/255, alpha: 1)   // #D28982
    static let olxBrightBlue = UIColor(red: 58/255, green: 119/255, blue: 255/255, alpha: 1) // #3A77FF
    static let olxCyan = UIColor(red: 35/255, green: 229/255, blue: 219/255, alpha: 1)       // #23E5DB
    static let olxOrange = UIColor(red: 255/255, green: 86/255, blue: 54/255, alpha: 1)      // #FF5636
    static let olxYellow = UIColor(red: 255/255, green: 206/255, blue: 50/255, alpha: 1)     // #FFCE32
    
    // MARK: - Light/Neutral Colors
    static let olxLightGrey = UIColor(red: 235/255, green: 238/255, blue: 239/255, alpha: 1) // #EBEEEF
    static let olxLightBlue = UIColor(red: 199/255, green: 220/255, blue: 255/255, alpha: 1) // #C7DCFF
    static let olxLightCyan = UIColor(red: 203/255, green: 247/255, blue: 238/255, alpha: 1) // #CBF7EE
    static let olxLightPeach = UIColor(red: 255/255, green: 214/255, blue: 201/255, alpha: 1) // #FFD6C9
    static let olxLightYellow = UIColor(red: 248/255, green: 251/255, blue: 207/255, alpha: 1) // #F8FBCF
    
    // MARK: - Semantic Colors
    static let olxPrimary = olxDarkNavy
    static let olxSecondary = olxTurquoise
    static let olxAccent = olxOrange
    static let olxSuccess = olxTurquoise
    static let olxWarning = olxYellow
    static let olxError = olxRoseRed
    static let olxBackground = UIColor.white
    static let olxSurface = olxLightGrey
}

// MARK: - SwiftUI Colors
extension Color {
    
    // Primary Colors
    static let olxDarkNavy = Color(red: 0/255, green: 47/255, blue: 52/255)
    static let olxRoyalBlue = Color(red: 29/255, green: 60/255, blue: 129/255)
    static let olxTurquoise = Color(red: 0/255, green: 164/255, blue: 159/255)
    
    // Secondary Colors
    static let olxRoseRed = Color(red: 170/255, green: 19/255, blue: 61/255)
    static let olxWarmTan = Color(red: 210/255, green: 137/255, blue: 130/255)
    static let olxBrightBlue = Color(red: 58/255, green: 119/255, blue: 255/255)
    static let olxCyan = Color(red: 35/255, green: 229/255, blue: 219/255)
    static let olxOrange = Color(red: 255/255, green: 86/255, blue: 54/255)
    static let olxYellow = Color(red: 255/255, green: 206/255, blue: 50/255)
    
    // Light/Neutral Colors
    static let olxLightGrey = Color(red: 235/255, green: 238/255, blue: 239/255)
    static let olxLightBlue = Color(red: 199/255, green: 220/255, blue: 255/255)
    static let olxLightCyan = Color(red: 203/255, green: 247/255, blue: 238/255)
    static let olxLightPeach = Color(red: 255/255, green: 214/255, blue: 201/255)
    static let olxLightYellow = Color(red: 248/255, green: 251/255, blue: 207/255)
    
    // Semantic Colors
    static let olxPrimary = olxDarkNavy
    static let olxSecondary = olxTurquoise
    static let olxAccent = olxOrange
    static let olxSuccess = olxTurquoise
    static let olxWarning = olxYellow
    static let olxError = olxRoseRed
}

// MARK: - Typography
struct OLXTypography {
    
    // Font Name - Use Inter (download from Google Fonts)
    static let fontFamily = "Inter"
    
    // Font Sizes
    static let heading1: CGFloat = 32
    static let heading2: CGFloat = 24
    static let heading3: CGFloat = 20
    static let heading4: CGFloat = 18
    static let bodyLarge: CGFloat = 16
    static let bodyRegular: CGFloat = 14
    static let bodySmall: CGFloat = 12
    static let caption: CGFloat = 10
    
    // Font Weights
    static func regular(_ size: CGFloat) -> UIFont {
        UIFont(name: "\(fontFamily)-Regular", size: size) ?? UIFont.systemFont(ofSize: size, weight: .regular)
    }
    
    static func medium(_ size: CGFloat) -> UIFont {
        UIFont(name: "\(fontFamily)-Medium", size: size) ?? UIFont.systemFont(ofSize: size, weight: .medium)
    }
    
    static func semiBold(_ size: CGFloat) -> UIFont {
        UIFont(name: "\(fontFamily)-SemiBold", size: size) ?? UIFont.systemFont(ofSize: size, weight: .semibold)
    }
    
    static func bold(_ size: CGFloat) -> UIFont {
        UIFont(name: "\(fontFamily)-Bold", size: size) ?? UIFont.systemFont(ofSize: size, weight: .bold)
    }
}

// MARK: - Spacing
struct OLXSpacing {
    static let xs: CGFloat = 4
    static let sm: CGFloat = 8
    static let md: CGFloat = 16
    static let lg: CGFloat = 24
    static let xl: CGFloat = 32
    static let xxl: CGFloat = 48
}

// MARK: - Border Radius
struct OLXRadius {
    static let sm: CGFloat = 4
    static let md: CGFloat = 8
    static let lg: CGFloat = 12
    static let xl: CGFloat = 16
    static let full: CGFloat = 9999
}

// MARK: - Shadows
struct OLXShadow {
    static let small = (color: UIColor.black.withAlphaComponent(0.1), offset: CGSize(width: 0, height: 2), radius: CGFloat(4))
    static let medium = (color: UIColor.black.withAlphaComponent(0.15), offset: CGSize(width: 0, height: 4), radius: CGFloat(8))
    static let large = (color: UIColor.black.withAlphaComponent(0.2), offset: CGSize(width: 0, height: 8), radius: CGFloat(16))
}

// MARK: - Example Usage in SwiftUI
/*
 
 // Button Example
 Button(action: {}) {
     Text("Objavi oglas")
         .font(.system(size: OLXTypography.bodyLarge, weight: .semibold))
         .foregroundColor(.white)
         .padding(.horizontal, OLXSpacing.lg)
         .padding(.vertical, OLXSpacing.md)
         .background(Color.olxTurquoise)
         .cornerRadius(OLXRadius.md)
 }
 
 // Card Example
 VStack {
     Text("Naslov")
         .foregroundColor(.olxDarkNavy)
 }
 .padding(OLXSpacing.md)
 .background(Color.olxLightGrey)
 .cornerRadius(OLXRadius.lg)
 
 */
