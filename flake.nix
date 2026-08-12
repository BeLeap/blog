{
  description = "beleap's Astro field notes blog";

  inputs = {
    self.submodules = true;
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";
  };

  outputs = {nixpkgs, ...}: let
    systems = [
      "aarch64-darwin"
      "x86_64-darwin"
      "aarch64-linux"
      "x86_64-linux"
    ];
    forAllSystems = nixpkgs.lib.genAttrs systems;
  in {
    packages = forAllSystems (system: let
      pkgs = import nixpkgs {inherit system;};
    in {
      default = pkgs.buildNpmPackage {
        pname = "beleap-blog";
        version = "0.0.0";
        src = ./.;

        npmDepsHash = "sha256-hHOPZUbe8j4WuuZXlvGRVjpAD19kKBirC5WiffX5XbQ=";
        npmBuildScript = "build";

        preBuild = ''
          export PUBLIC_POSTHOG_PROJECT_TOKEN=phc_s8bgDNDCA6DAcquLuwmd3pGVfMDjjDHitZGLLVziSwCv
          export PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
          export SITE="https://beleap.dev"
          export BASE_PATH="/"
        '';

        installPhase = ''
          runHook preInstall
          mkdir -p $out
          cp -r dist/. $out/
          runHook postInstall
        '';
      };
    });

    devShells = forAllSystems (system: let
      pkgs = import nixpkgs {inherit system;};
    in {
      default = pkgs.mkShell {
        packages = [
          pkgs.nodejs_24
        ];

        shellHook = ''
          export ASTRO_TELEMETRY_DISABLED=1
          echo "BeLeap — npm run dev"
        '';
      };
    });
  };
}
