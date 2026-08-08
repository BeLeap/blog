{
  description = "beleap's Astro field notes blog";

  inputs = {
    self.submodules = true;
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";
  };

  outputs = { nixpkgs, ... }:
    let
      systems = [
        "aarch64-darwin"
        "x86_64-darwin"
        "aarch64-linux"
        "x86_64-linux"
      ];
      forAllSystems = nixpkgs.lib.genAttrs systems;
    in
    {
      packages = forAllSystems (system:
        let
          pkgs = import nixpkgs { inherit system; };
        in
        {
          default = pkgs.buildNpmPackage {
            pname = "beleap-blog";
            version = "0.0.0";
            src = ./.;

            npmDepsHash = "sha256-JSKzvaqYEfHk9QGZ1UCQ7tz5nB4qEuV70xns49lsflc=";
            npmBuildScript = "build";

            preBuild = ''
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

      devShells = forAllSystems (system:
        let
          pkgs = import nixpkgs { inherit system; };
        in
        {
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
