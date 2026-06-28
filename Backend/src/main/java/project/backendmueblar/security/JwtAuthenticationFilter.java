//package project.backendmueblar.security;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//import org.springframework.lang.NonNull;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//import project.backendmueblar.modules.auth.services.JwtService;
//
//import java.io.IOException;
//import java.util.Map;
//
//@Component
//@RequiredArgsConstructor
//public class JwtAuthenticationFilter extends OncePerRequestFilter {
//    private final JwtService jwtService;
//
//    @Override
//    protected void doFilterInternal(@NonNull HttpServletRequest request,
//                                    @NonNull HttpServletResponse response,
//                                    @NonNull FilterChain filterChain
//    ) throws ServletException, IOException {
//
//        final String authHeader = request.getHeader("Authorization");
//        final String tokenJWT = authHeader.substring(7);
//        final String userEmail = jwtService.extractEmail(tokenJWT);
//
//        String urlRequested =  request.
//        String method = request.getMethod().toUpperCase();
//
//        if (authHeader != null || authHeader.startsWith("Bearer ")) {
//            if(userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//                Map<String, Integer> endpointAndPermissions = jwtService.extractEndpointsAndPermissions(tokenJWT, urlRequested);
//            }
//        }
//
//        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//            String rutaSolicitada = request.getRequestURI(); // Ej: /api/productos
//            String metodoHttp = request.getMethod();         // Ej: POST
//            if (!tienePermiso(permisosDelUsuario, rutaSolicitada, metodoHttp)) {
//                response.sendError(HttpServletResponse.SC_FORBIDDEN, "Acceso denegado: No tienes los permisos necesarios para esta acción.");
//                return;
////            }
//            if (jwtService.isTokenValid(tokenJWT, userEmail)) {
//                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
//                        userEmail,null, null
//                );
//                SecurityContextHolder.getContext().setAuthentication(authToken);
//            }
//        }
//        filterChain.doFilter(request, response);
//    }
//
//    private boolean urlHasEnoughPermissions(Map<String, Integer> endpointPermissionMap, String url, String httpMethod) {
//        Integer permissionsInBits = endpointPermissionMap.get(url);
//        int requiredBit = switch (httpMethod) {
//            case "GET" -> 1;    // ACCESO
//            case "POST" -> 2;   // CREACION
//            case "PUT" -> 4;    // MODIFICACION
//            case "DELETE" -> 8; // ELIMINACION
//            default -> 0;       // Cualquier otro método no lo permitimos por defecto
//        };
//        return (permissionsInBits & requiredBit) == requiredBit;
//    }
//}